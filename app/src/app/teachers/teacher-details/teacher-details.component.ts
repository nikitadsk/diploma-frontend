import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITeacher} from "../../models/teacher";
import {DisciplinesService} from "../../services/disciplines.service";
import {Observable} from "rxjs";
import {IDiscipline} from "../../models/discipline";

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnChanges {

  @Input() teacher: ITeacher;
  teacherDisciplines: Observable<IDiscipline[]>

  constructor(private disciplinesService: DisciplinesService) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.teacher);
    this.teacherDisciplines = this.disciplinesService.getByIds(this.teacher.disciplineIds);
  }

}
