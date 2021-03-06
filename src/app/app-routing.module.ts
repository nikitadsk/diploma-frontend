import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {CheckTokenGuard} from './guards/check-token.guard';
import {IsAuthorizationedGuard} from './guards/is-authorizationed.guard';
import {IsAdminGuard} from './guards/is-admin.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsAuthorizationedGuard]
  },
  {
    path: 'teachers',
    loadChildren: () => import('./teachers/teachers.module').then(m => m.TeachersModule),
    canActivate: [CheckTokenGuard, IsAdminGuard]
  },
  {
    path: 'disciplines',
    loadChildren: () => import('./disciplines/disciplines.module').then(m => m.DisciplinesModule),
    canActivate: [CheckTokenGuard, IsAdminGuard]
  },
  {
    path: 'specialty',
    loadChildren: () => import('./specialty/specialty.module').then(m => m.SpecialtyModule),
    canActivate: [CheckTokenGuard, IsAdminGuard]
  },
  {
    path: 'groups',
    loadChildren: () => import('./groups/groups.module').then(m => m.GroupsModule),
    canActivate: [CheckTokenGuard]
  },
  {
    path: 'statistic',
    loadChildren: () => import('./statistic/statistic.module').then(m => m.StatisticModule),
    canActivate: [CheckTokenGuard]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
