import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { storeInchargeRoutes } from './store-incharge/store-incharge.module';
import { storeManagerRoutes } from './store-manager/store-manager.module';
import { storeWorkerRoutes } from './store-worker/store-worker.module';
import { SupervisorModule, supervisorRoutes } from './supervisor/supervisor.module';
import { supervisorInchargeRoutes } from './supervisor-incharge/supervisor-incharge.module';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { sharedRoutes } from './shared/shared.module';
import { LoginRoutingComponent } from './authentication/login-routing/login-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthenticationModule,
    SupervisorModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      // { path: 'login', component: LoginComponent },
      { path: 'login', component: LoginRoutingComponent },
      { path: 'dashboard', component: DashboardComponent},
      {path:'storeincharge',children:storeInchargeRoutes},
      {path:'storemanager',children:storeManagerRoutes},
      {path:'storeworker',children:storeWorkerRoutes},
      {path:'supervisor',children:supervisorRoutes},
      {path:'supervisorincharge',children:supervisorInchargeRoutes},
      {path:'shared',children:sharedRoutes},
    ])
  ],
  providers: [
    {
      provide: JWT_OPTIONS,
      useValue: {
        tokenGetter: () => {
          return;
        },
        throwNoTokenError: true,
      },
    },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
