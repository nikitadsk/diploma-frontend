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

  @ViewChild(DetailsPanelComponent) detailsPanel: DetailsPanelComponent;

  sidebarOpened: boolean = false;

  teachers: Observable<ITeacher[]>;
  selectedTeacher: ITeacher;

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
    this.teachers = this.teachersService.getAll();
  }

  ngAfterViewInit(): void {
    if (this.detailsPanel) {
      this.detailsPanel.openedChange.subscribe(opened => {
        this.sidebarOpened = opened;
        if (!opened) {
          this.selectedTeacher = null;
        }
      });
    }
  }

  teacherClicked(teacher: ITeacher) {
    this.selectedTeacher = teacher;
    this.sidebarOpened = true;
  }

}
