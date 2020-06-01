import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IGroup} from '../../models/group';
import {Observable} from 'rxjs';
import {IDiscipline} from '../../models/discipline';
import {DisciplinesService} from '../../services/disciplines.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit, OnChanges {

  @Input() group: IGroup;

  disciplines: Observable<IDiscipline[]>;

  constructor(
    private disciplinesService: DisciplinesService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.disciplines = this.disciplinesService.getByIds(this.group.disciplineIds);
  }

}
