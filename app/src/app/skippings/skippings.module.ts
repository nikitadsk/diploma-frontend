import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkippingsComponent } from './skippings.component';
import {SkippingsRoutingModule} from "./skippings-routing.module";



@NgModule({
  declarations: [SkippingsComponent],
  imports: [
    CommonModule,
    SkippingsRoutingModule
  ]
})
export class SkippingsModule { }
