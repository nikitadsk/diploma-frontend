import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';



@NgModule({
  declarations: [GroupsComponent],
    imports: [
        CommonModule,
        GroupsRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        SelectDropDownModule
    ]
})
export class GroupsModule { }
