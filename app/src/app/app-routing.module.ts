import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule)
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
  },
  {
    path: 'skippings',
    loadChildren: () => import('./skippings/skippings.module').then(m => m.SkippingsModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
