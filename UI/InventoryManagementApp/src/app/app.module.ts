import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule,DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { StoreManagerModule, storeManagerRoutes } from './store-manager/store-manager.module';
import { supervisorsRoutes } from './supervisor/supervisor.module';
import { storeWorkerRoutes } from './store-worker/store-worker.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [
  {path:'', redirectTo:'home',pathMatch:"full"},
  { path: 'home', component: LoginComponent },
  {path:'navbar',component:NavbarComponent},
  {path:'login',component:LoginComponent},
  { path: 'storemanager', children: storeManagerRoutes },
  { path: 'storeworker', children: storeWorkerRoutes },
  { path: 'supervisor', children: supervisorsRoutes },
]

@NgModule({
  declarations: [
    AppComponent,
    // NavbarComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
