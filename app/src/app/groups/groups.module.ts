import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import { GroupDetailsComponent } from './group-details/group-details.component';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [GroupsComponent, GroupDetailsComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SelectDropDownModule,
    NgbNavModule
  ]
})
export class GroupsModule { }
