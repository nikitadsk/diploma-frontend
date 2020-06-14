import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import {StatisticRoutingModule} from './statistic-routing.module';
import {SharedModule} from '../shared/shared.module';
import {NgApexchartsModule} from 'ng-apexcharts';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [StatisticComponent],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    CommonModule,
    StatisticRoutingModule,
    SelectDropDownModule
  ]
})
export class StatisticModule { }
