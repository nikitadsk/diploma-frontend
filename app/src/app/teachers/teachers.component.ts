import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TeachersService} from '../services/teachers.service';
import {Observable} from 'rxjs';
import {ITeacher} from '../models/teacher';
import {DetailsPanelComponent} from '../shared/components/details-panel/details-panel.component';
import {FormBuilder, Validators} from '@angular/forms';
import {DisciplinesService} from '../services/disciplines.service';
import {IDiscipline} from '../models/discipline';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit, AfterViewInit {

  @ViewChild(DetailsPanelComponent) detailsPanel: DetailsPanelComponent;

  sidebarOpened = false;

  teachers: Observable<ITeacher[]>;
  selectedTeacher: ITeacher;

  allDisciplines: Observable<IDiscipline[]>;

  headerNames: string[] = [
    'Фамилия',
    'Имя',
    'Отчество'
  ];

  contentFields: string[] = [
    'lastName',
    'firstName',
    'patronym'
  ];

  teacherForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    patronym: ['', Validators.required],
    disciplineIds: ['', Validators.required]
  });

  config = {
    displayKey: 'disciplineName',
    search: true,
    limitTo: 3,
    selectedItems: [],
  };

  constructor(
    private teachersService: TeachersService,
    private disciplinesService: DisciplinesService,
    private fb: FormBuilder
  ) { }

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

  openAddDialog() {
    this.allDisciplines = this.disciplinesService.getAll();
  }

  addTeacher() {
    if (this.teacherForm.valid) {
      const teacher = this.teacherForm.value;
      teacher.disciplineIds = teacher.disciplineIds.map(discipline => discipline._id);
      const subscription = this.teachersService.create(teacher).subscribe(() => {
        this.teachers = this.teachersService.getAll();
        this.teacherForm.reset({ disciplineIds: [] });
        subscription.unsubscribe();
      });
    }

  }

}
