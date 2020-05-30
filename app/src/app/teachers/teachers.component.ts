import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TeachersService} from "../services/teachers.service";
import {Observable} from "rxjs";
import {ITeacher} from "../models/teacher";
import {DetailsPanelComponent} from "../shared/components/details-panel/details-panel.component";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit, AfterViewInit {

  @ViewChild(DetailsPanelComponent, {static: false}) detailsPanel: DetailsPanelComponent;

  sidebarOpened: boolean = false;

  teachers: Observable<ITeacher[]>;

  headerNames: string[] = [
    'Фамилия',
    'Имя',
    'Отчество'
  ];

  contentFields: string[] = [
    'lastName',
    'firstName',
    'patronym'
  ]

  constructor(private teachersService: TeachersService) { }

  ngOnInit() {
    this.teachers = this.teachersService.get();
  }

  ngAfterViewInit(): void {
    if (this.detailsPanel) {
      this.detailsPanel.openedChange.subscribe(opened => {
        this.sidebarOpened = opened;
        if (!opened) {

        }
      });
    }
  }

  teacherClicked(teacher: ITeacher) {
    this.sidebarOpened = true;
    console.log(teacher);
  }

}
