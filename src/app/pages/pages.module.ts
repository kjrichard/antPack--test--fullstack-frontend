import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

// Modulos
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DetailUserComponent } from './detail-user/detail-user.component';




@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    UsersComponent,
    RegisterUserComponent,
    UpdateUserComponent,
    DetailUserComponent,
  ],
  exports: [
    DashboardComponent,
    PagesComponent,
  ],
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    
  ]
})
export class PagesModule { }
