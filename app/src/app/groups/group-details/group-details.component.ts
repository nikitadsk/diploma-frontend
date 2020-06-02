import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IGroup} from '../../models/group';
import {forkJoin, of} from 'rxjs';
import {IDiscipline} from '../../models/discipline';
import {DisciplinesService} from '../../services/disciplines.service';
import {StudentsService} from '../../services/students.service';
import {IStudent} from '../../models/student';
import {FormBuilder, Validators} from '@angular/forms';
import {concatMap, flatMap, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {GroupsService} from '../../services/groups.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, OnChanges {

  @Input() groupId: string;

  group: IGroup;

  disciplines: IDiscipline[];
  allDisciplines: IDiscipline[];
  students: IStudent[];

  studentsHeaderNames: string[] = [
    'Фамилия',
    'Имя',
    'Отчество'
  ];

  studentContentFields: string[] = [
    'lastName',
    'firstName',
    'patronym'
  ];

  studentForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    patronym: ['', Validators.required],
    groupId: ['']
  });

  groupForm = this.fb.group({
    groupNumber: [{value: '', disabled: true}, Validators.required],
    specialtyName: [{value: '', disabled: true}, Validators.required],
    curatorName: [{value: '', disabled: true}, Validators.required],
    headman: ['', Validators.required],
    disciplines: ['', Validators.required]
  });

  disciplineConfig = {
    displayKey: 'disciplineName',
    search: true,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  studentConfig = {
    displayKey: 'studentName',
    search: true,
    limitTo: 3,
    selectedItems: [],
    searchPlaceholder: 'Поиск',
    noResultsFound: 'Не найдено результатов',
    placeholder: 'Выберите'
  };

  constructor(
    private disciplinesService: DisciplinesService,
    private studentsService: StudentsService,
    private groupsService: GroupsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const source = this.groupsService.getById(this.groupId).pipe(
      tap(group => this.group = group),
      concatMap(() => {
        return forkJoin({
          disciplines: this.disciplinesService.getByIds(this.group.disciplineIds),
          students: this.studentsService.getByGroupId(this.group._id).pipe(
            flatMap(students => students),
            map(student => {
              student.studentName = `${student.lastName} ${student.firstName} ${student.patronym}`;
              return student;
            }),
            toArray()
          )
        });
      })
    );

    const subscription = source.subscribe(({ disciplines, students}) => {
      this.disciplines = disciplines;
      this.students = students;
      subscription.unsubscribe();
    });
  }

  addStudent() {
    if (this.studentForm.valid) {
      const newStudent: IStudent = this.studentForm.value;
      newStudent.groupId = this.group._id;
      const subscription = this.studentsService.create(newStudent).pipe(
        mergeMap(() => this.studentsService.getByGroupId(this.group._id).pipe(
          flatMap(students => students),
          map(student => {
            student.studentName = `${student.lastName} ${student.firstName} ${student.patronym}`;
            return student;
          }),
          toArray()
        ))
      ).subscribe(students => {
        this.students = students;
        this.studentForm.reset();
        subscription.unsubscribe();
      });
    }
  }

  clickEditGroup() {
    const subscription = this.disciplinesService.getAll().subscribe(disciplines => {
      this.allDisciplines = disciplines;
      subscription.unsubscribe();
    });
    this.groupForm.patchValue({
      ...this.group,
      disciplines: [...this.disciplines],
      headman: this.students.find(student => student._id === this.group.headmanId)
    });
  }

  editGroup() {
    if (this.groupForm.valid && this.groupForm.dirty) {
      const editedGroup = this.groupForm.value;
      editedGroup._id = this.group._id;
      editedGroup.headmanId = editedGroup.headman._id;
      editedGroup.disciplineIds = editedGroup.disciplines.map(discipline => discipline._id);
      const subscription = this.groupsService.update(editedGroup).pipe(
        concatMap(() => forkJoin({
          group: this.groupsService.getById(this.groupId),
          disciplines: this.disciplinesService.getByIds(editedGroup.disciplineIds)
        })
      )).subscribe(({ group, disciplines }) => {
        this.group = group;
        this.disciplines = disciplines;
        this.groupForm.reset();
        subscription.unsubscribe();
      });
    }
  }

  toObservable(content) {
    return of(content);
  }

}
