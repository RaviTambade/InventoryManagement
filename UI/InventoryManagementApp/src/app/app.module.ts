import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule,DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { StoreManagerModule, storeManagerRoutes } from './store-manager/store-manager.module';
import { supervisorsRoutes } from './supervisor/supervisor.module';
import { storeWorkerRoutes } from './store-worker/store-worker.module';
import { SharedModule, sharedRoutes } from './shared/shared.module';
import { storeInchargeRoutes } from './store-incharge/store-incharge.module';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:"full"},
   {path:'login',component:LoginComponent},
  { path: 'storemanager', children: storeManagerRoutes },
  { path: 'storeworker', children: storeWorkerRoutes },
  { path: 'supervisor', children: supervisorsRoutes },
  { path: 'storeincharge', children: storeInchargeRoutes },
  { path: 'shared', children: sharedRoutes },
]

@NgModule({
  declarations: [
    AppComponent,
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
