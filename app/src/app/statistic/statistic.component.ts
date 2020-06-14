import {Component, OnInit, ViewChild} from '@angular/core';
import {SchedulesService} from '../services/schedules.service';
import {FormBuilder, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, flatMap, map, toArray} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IGroup} from '../models/group';
import {GroupsService} from '../services/groups.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
} from 'ng-apexcharts';
import {ISchedule} from '../models/schedule';
import * as moment from 'moment';

export interface ChartOptions {
  series?: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive[];
  xaxis: ApexXAxis;
  legend: ApexLegend;
  fill: ApexFill;
  colors: any;
}

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    colors: ['#008000', '#FF0000'],
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  searchForm = this.fb.group({
    group: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });

  groupsConfig = {
    displayKey: 'groupName',
    search: false,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  groups: Observable<IGroup[]>;

  isVisible = false;

  constructor(
    private schedulesService: SchedulesService,
    private groupsService: GroupsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.groups = this.groupsService.getAll().pipe(
      flatMap(groups => groups),
      map(group => {
        return { ...group, groupName: `${group.specialtyName}-${group.groupNumber}`};
      }),
      toArray()
    );

    this.searchForm.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(1000),
      )
      .subscribe(value => {
        if (this.searchForm.valid) {
          const subscription = this.schedulesService.getByGroupIdAndDates({
            startDate: moment(value.startDate).format(),
            endDate: moment(value.endDate).format(),
            groupId: value.group._id
          }).pipe(
            flatMap((schedules: ISchedule[]) => schedules),
            map(schedule => {
              return {
                ...schedule,
                respectfulSkippingsCount: schedule.skippings.reduce((acc, skipping) => {
                  return acc += skipping.respectfulSkippings.length;
                }, 0),
                disrespectfulSkippingsCount: schedule.skippings.reduce((acc, skipping) => {
                  return acc += skipping.disrespectfulSkippings.length;
                }, 0)
              };
            }),
            toArray()
          ).subscribe((schedules: ISchedule[]) => {
            this.isVisible = false;

            const dataForChart = [{
              name: 'Уважительные причины',
              data: []
            }, {
              name: 'Неуважительные причины',
              data: []
            }];

            const categories = [];

            schedules.forEach(schedule => {
              dataForChart[0].data.push(schedule.respectfulSkippingsCount);
              dataForChart[1].data.push(schedule.disrespectfulSkippingsCount);
              categories.push(moment(schedule.date).format('DD-MM-YYYY'));
            });


            this.chartOptions = {
              ...this.chartOptions,
              series: [...dataForChart],
              xaxis: {
                type: 'category',
                categories
              }
            };

            this.isVisible = true;

            subscription.unsubscribe();
          });
        }
      });
  }

}
