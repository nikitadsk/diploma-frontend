import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {IDiscipline} from "../models/discipline";
import {DisciplinesService} from "../services/disciplines.service";

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
  ]

  constructor(private disciplinesService: DisciplinesService) { }

  ngOnInit() {
    this.disciplines = this.disciplinesService.get();
  }

}
