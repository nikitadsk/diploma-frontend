import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ITeacher} from '../../models/teacher';
import {DisciplinesService} from '../../services/disciplines.service';
import {Observable} from 'rxjs';
import {IDiscipline} from '../../models/discipline';
import {GroupsService} from '../../services/groups.service';
import {IGroup} from '../../models/group';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnChanges {

  @Input() teacher: ITeacher;
  teacherDisciplines: Observable<IDiscipline[]>;

  supervisedGroup: IGroup;

  constructor(
    private disciplinesService: DisciplinesService,
    private groupsService: GroupsService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.teacher);
    this.teacherDisciplines = this.disciplinesService.getByIds(this.teacher.disciplineIds);

    if (this.teacher.isCurator) {
      const subscription = this.groupsService.getByCuratorId(this.teacher._id).subscribe((group) => {
        this.supervisedGroup = group;
        subscription.unsubscribe();
      });
    }
  }

}
