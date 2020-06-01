import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IGroup} from '../../models/group';
import {Observable} from 'rxjs';
import {IDiscipline} from '../../models/discipline';
import {DisciplinesService} from '../../services/disciplines.service';
import {StudentsService} from '../../services/students.service';
import {IStudent} from '../../models/student';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, OnChanges {

  @Input() group: IGroup;

  disciplines: Observable<IDiscipline[]>;
  students: Observable<IStudent[]>;

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
    groupId: [''],
    isHeadman: [false, Validators.required]
  });

  constructor(
    private disciplinesService: DisciplinesService,
    private studentsService: StudentsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.disciplines = this.disciplinesService.getByIds(this.group.disciplineIds);
    this.students = this.studentsService.getByGroupId(this.group._id);
  }

  addStudent() {
    if (this.studentForm.valid) {
      const student: IStudent = this.studentForm.value;
      student.groupId = this.group._id;
      const subscription = this.studentsService.create(student).subscribe(() => {
        this.students = this.studentsService.getByGroupId(this.group._id);
        this.studentForm.reset({ isHeadman: false });
        subscription.unsubscribe();
      });
    }
  }

}
