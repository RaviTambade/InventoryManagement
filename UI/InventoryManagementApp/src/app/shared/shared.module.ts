import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

export const sharedRoutes: Routes = [
  { path: 'profile', component: ProfileComponent },

]

@NgModule({
  declarations: [
    ProfileComponent,
    NavbarComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule, 

  ],
  exports:[ProfileComponent,NavbarComponent]
})
export class SharedModule { }
