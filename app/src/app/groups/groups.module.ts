import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [GroupsComponent],
    imports: [
        CommonModule,
        GroupsRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class GroupsModule { }
