import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from 'angular-datatables';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TeacherDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
