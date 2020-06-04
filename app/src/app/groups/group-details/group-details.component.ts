import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {IGroup} from '../../models/group';
import {forkJoin, of} from 'rxjs';
import {IDiscipline} from '../../models/discipline';
import {DisciplinesService} from '../../services/disciplines.service';
import {StudentsService} from '../../services/students.service';
import {IStudent} from '../../models/student';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {concatMap, flatMap, map, mergeMap, tap, toArray} from 'rxjs/operators';
import {GroupsService} from '../../services/groups.service';
import {SchedulesService} from '../../services/schedules.service';
import {ISchedule} from '../../models/schedule';
import {TeachersService} from '../../services/teachers.service';
import {SelectDropDownComponent} from 'ngx-select-dropdown';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, OnChanges {

  @Input() groupId: string;

  @ViewChildren('teacherDropdown') teacherDropdown: QueryList<SelectDropDownComponent>;

  group: IGroup;

  disciplines: IDiscipline[];
  allDisciplines: IDiscipline[];
  students: IStudent[];
  schedules: ISchedule[];

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

  scheduleForm = this.fb.group({
    _id: [''],
    regionalDate: [''],
    date: ['', Validators.required],
    lessons: this.fb.array([])
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

  teacherConfig = {
    displayKey: 'name',
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
    private schedulesService: SchedulesService,
    private teachersService: TeachersService,
    private fb: FormBuilder
  ) { }

  getLessons() {
    return this.scheduleForm.get('lessons') as FormArray;
  }

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
          ),
          schedules: this.schedulesService.getByGroupId(this.group._id)
        });
      })
    );

    const subscription = source.subscribe(({ disciplines, students, schedules}) => {
      this.disciplines = disciplines;
      this.students = students;
      this.schedules = schedules;
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

  showSchedule(schedule: ISchedule) {
    this.scheduleForm.patchValue(schedule);

    schedule.lessons.forEach(lesson => {
      const lessonFormGroup = this.createLesson();
      lessonFormGroup.patchValue(lesson);
      this.getLessons().push(lessonFormGroup);
    });
  }

  createLesson() {
    return this.fb.group({
      teacherId: [''],
      disciplineId: [''],
      teacherName: [''],
      disciplineName: [''],
      discipline: ['', Validators.required],
      teacher: [{value: '', disabled: true}, Validators.required]
    });
  }

  removeAllControls() {
    this.getLessons().controls = [];
    this.getLessons().patchValue([]);
  }

  removeControlById(id) {
    this.getLessons().removeAt(id);
  }

  openAddSchedule() {
    (this.scheduleForm.get('lessons') as FormArray).push(this.createLesson());
  }

  addOneFormGroup() {
    (this.scheduleForm.get('lessons') as FormArray).push(this.createLesson());
  }

  disciplineSelected(discipline, controlId) {
    if (discipline) {
      const teacherDropdown = this.teacherDropdown.toArray();
      teacherDropdown[controlId].availableItems = [];
      teacherDropdown[controlId].selectedItems = [];
      teacherDropdown[controlId].selectedDisplayText = '';

      const subscription = this.teachersService.getByDisciplineId(discipline._id).subscribe(teachers => {
        (this.scheduleForm.get('lessons') as FormArray).controls[controlId].get('teacher').enable();
        teacherDropdown[controlId].availableItems = teachers;
        subscription.unsubscribe();
      });
    } else {
      (this.scheduleForm.get('lessons') as FormArray).controls[controlId].get('teacher').disable();
    }
  }

  createSchedule() {
    if (this.scheduleForm.valid) {
      const schedule: ISchedule = this.scheduleForm.value;

      schedule.groupId = this.groupId;
      schedule.lessons.forEach(lesson => {
        lesson.disciplineId = lesson.discipline._id;
        lesson.teacherId = lesson.teacher._id;
      });

      const subscription = this.schedulesService.create(schedule).subscribe(() => {
        this.ngOnChanges({});
        subscription.unsubscribe();
      });
    }
    this.removeAllControls();
  }
}
