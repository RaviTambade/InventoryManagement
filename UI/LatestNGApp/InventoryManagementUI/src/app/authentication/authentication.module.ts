import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { LoginRoutingComponent } from './login-routing/login-routing.component';



@NgModule({
  declarations: [
    LoginComponent,
    LoginRoutingComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AuthenticationModule { }
