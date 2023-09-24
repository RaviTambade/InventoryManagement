import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments/departments.component';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { StoreComponent } from './store/store.component';
import { MaterialsComponent } from './materials/materials.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';

export const sharedRoutes:Routes=[
  {path:'profile',component:ProfileComponent},
  {path:'store',component:StoreComponent},
  {path:'departmentslist',component:DepartmentsListComponent},
  {path:'departments',component:DepartmentsComponent},


]

@NgModule({
  declarations: [
    ProfileComponent,
    DepartmentsComponent,
    DepartmentsListComponent,
    StoreComponent,
    MaterialsComponent,
    MaterialDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
