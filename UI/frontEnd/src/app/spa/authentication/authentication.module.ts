import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateContactComponent } from './update-contact/update-contact.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationRoutingComponent } from './authentication-routing/authentication-routing.component';

export const authRoutes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'updatepassword',component:UpdatePasswordComponent},
  {path:'updatecontact',component:UpdateContactComponent},
]

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    UpdateContactComponent,
    UpdatePasswordComponent,
    AuthenticationRoutingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  exports:[AuthenticationRoutingComponent]

})
export class AuthenticationModule { }
