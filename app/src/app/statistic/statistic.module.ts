import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticComponent } from './statistic.component';
import {StatisticRoutingModule} from './statistic-routing.module';
import {SharedModule} from '../shared/shared.module';
import {NgApexchartsModule} from 'ng-apexcharts';



@NgModule({
  declarations: [StatisticComponent],
  imports: [
    SharedModule,
    NgApexchartsModule,
    CommonModule,
    StatisticRoutingModule
  ]
})
export class StatisticModule { }
