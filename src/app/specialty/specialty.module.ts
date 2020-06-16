import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialtyComponent } from './specialty.component';
import {SpecialtyRoutingModule} from './specialty-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [SpecialtyComponent],
  imports: [
    CommonModule,
    SpecialtyRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class SpecialtyModule { }
