import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './components/table/table.component';
import { DetailsPanelComponent } from './components/details-panel/details-panel.component';



@NgModule({
    declarations: [TableComponent, DetailsPanelComponent],
  exports: [
    TableComponent,
    DetailsPanelComponent
  ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
