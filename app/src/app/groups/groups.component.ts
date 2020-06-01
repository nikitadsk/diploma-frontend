import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../services/groups.service';
import {FormBuilder, Validators} from '@angular/forms';
import {forkJoin, Observable} from 'rxjs';
import {IGroup} from '../models/group';
import {ITeacher} from '../models/teacher';
import {ISpecialty} from '../models/specialty';
import {IDiscipline} from '../models/discipline';
import {TeachersService} from '../services/teachers.service';
import {SpecialtyService} from '../services/specialty.service';
import {DisciplinesService} from '../services/disciplines.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  groups: Observable<IGroup[]>;

  headerNames: string[] = [
    'Номер группы',
    'Специальность',
    'Куратор'
  ];

  contentFields: string[] = [
    'groupNumber',
    'specialtyName',
    'curatorName'
  ];

  allAvailableTeachers: ITeacher[];
  allSpecialty: ISpecialty[];
  allDisciplines: IDiscipline[];

  groupForm = this.fb.group({
    groupNumber: ['', Validators.required],
    specialtyId: ['', Validators.required],
    curatorId: ['', Validators.required],
    headmanId: [''],
    disciplineIds: ['', Validators.required]
  });

  disciplineConfig = {
    displayKey: 'disciplineName',
    search: true,
    limitTo: 3,
    selectedItems: [],
  };

  specialtyConfig = {
    displayKey: 'specialtyName',
    search: true,
    limitTo: 3,
    selectedItems: [],
  };

  teacherConfig = {
    displayKey: 'name',
    search: true,
    limitTo: 3,
    selectedItems: [],
  };

  constructor(
    private groupsService: GroupsService,
    private teachersService: TeachersService,
    private specialtyService: SpecialtyService,
    private disciplinesService: DisciplinesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.groups = this.groupsService.getAll();
  }

  openAddDialog() {
    const source = forkJoin({
      teachers: this.teachersService.getAvailableAsNewCurator(),
      specialty: this.specialtyService.getAll(),
      disciplines: this.disciplinesService.getAll()
    });

    const subscription = source.subscribe(data => {
      this.allAvailableTeachers = data.teachers;
      this.allDisciplines = data.disciplines;
      this.allSpecialty = data.specialty;
      subscription.unsubscribe();
    });
  }

}
