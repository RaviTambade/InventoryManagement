import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { StoreManagerModule } from '../store-manager/store-manager.module';

@NgModule({
  declarations: [
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    StoreManagerModule
  ],
  exports:[LoginComponent,NavbarComponent]
})
export class LoginModule { }
