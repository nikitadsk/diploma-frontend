import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisciplinesComponent } from './disciplines.component';
import {DisciplinesRoutingModule} from './disciplines-routing.module';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [DisciplinesComponent],
  imports: [
    CommonModule,
    DisciplinesRoutingModule,
    SharedModule
  ]
})
export class DisciplinesModule { }
