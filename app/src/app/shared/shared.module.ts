import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DetailsPanelComponent } from './components/details-panel/details-panel.component';
import { AddSkippingsComponent } from './components/add-skippings/add-skippings.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import { ShowSkippingComponent } from './components/show-skipping/show-skipping.component';



@NgModule({
    declarations: [TableComponent, DetailsPanelComponent, AddSkippingsComponent, ShowSkippingComponent],
  exports: [
    TableComponent,
    DetailsPanelComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectDropDownModule
  ]
})
export class SharedModule { }
