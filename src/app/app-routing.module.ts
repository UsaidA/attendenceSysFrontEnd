import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardGuard } from './login-guard.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const routes: Routes = [
{path: '', component: LoginComponent},
{path: 'login', component:LoginComponent},
{path:'register', component:RegisterComponent},
{path:'dashboard', component:DashboardComponent,canActivate: [LoginGuardGuard]},
{path: 'teacherDashboard', component:TeacherDashboardComponent, canActivate:[LoginGuardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
