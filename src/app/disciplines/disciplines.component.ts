import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {IDiscipline} from '../models/discipline';
import {DisciplinesService} from '../services/disciplines.service';

@Component({
  selector: 'app-disciplines',
  templateUrl: './disciplines.component.html',
  styleUrls: ['./disciplines.component.scss']
})
export class DisciplinesComponent implements OnInit {

  disciplines: Observable<IDiscipline[]>;

  headerNames: string[] = [
    'Идентификатор',
    'Наименование'
  ];

  contentFields: string[] = [
    '_id',
    'disciplineName'
  ];

  constructor(private disciplinesService: DisciplinesService) { }

  ngOnInit() {
    this.disciplines = this.disciplinesService.getAll();
  }

  addDiscipline(disciplineName: string) {
    const subscription = this.disciplinesService.create({ disciplineName }).subscribe(() => {
      this.disciplines = this.disciplinesService.getAll();
      subscription.unsubscribe();
    });
  }

  deleteDiscipline(discipline: IDiscipline) {
    const subscription = this.disciplinesService.delete(discipline._id).subscribe(() => {
      this.disciplines = this.disciplinesService.getAll();
      subscription.unsubscribe();
    });
  }

}
