import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SkippingsComponent} from './skippings.component';



const routes: Routes = [
  { path: '', component: SkippingsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkippingsRoutingModule { }
