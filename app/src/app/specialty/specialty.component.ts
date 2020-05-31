import { Component, OnInit } from '@angular/core';
import {ISpecialty} from '../models/specialty';
import {SpecialtyService} from '../services/specialty.service';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {

  specialty: Observable<ISpecialty[]>;

  headerNames: string[] = [
    'Идентификатор',
    'Наименование специальности',
    'Код специальности'
  ];

  contentFields: string[] = [
    '_id',
    'specialtyName',
    'specialtyCode'
  ];

  specialtyForm = this.fb.group({
    specialtyName: ['', Validators.required],
    specialtyCode: ['', Validators.required]
  });

  constructor(
    private specialtyService: SpecialtyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.specialty = this.specialtyService.getAll();
  }

  addSpecialty() {
    if (this.specialtyForm.valid) {
      const subscription = this.specialtyService.create(this.specialtyForm.value).subscribe(() => {
        this.specialty = this.specialtyService.getAll();
        this.specialtyForm.reset();
        subscription.unsubscribe();
      });
    }
  }

}
