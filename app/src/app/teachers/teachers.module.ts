import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import {TeachersRoutingModule} from './teachers-routing.module';
import {SharedModule} from '../shared/shared.module';
import { TeacherDetailsComponent } from './teacher-details/teacher-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';



@NgModule({
  declarations: [TeachersComponent, TeacherDetailsComponent],
  imports: [
    CommonModule,
    TeachersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    SelectDropDownModule
  ]
})
export class TeachersModule { }
