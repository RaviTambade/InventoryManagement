import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

export const sharedRoutes:Routes=[
  {path:'profile',component:ProfileComponent},


]

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
