import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RequestListComponent } from './request-list/request-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { RolesComponent } from './roles/roles.component';
import { DateSearchComponent } from './date-search/date-search.component';
import { RadioSearchComponent } from './radio-search/radio-search.component';
import { NestedDropdownComponent } from './nested-dropdown/nested-dropdown.component';
import { GridListComponent } from './grid-list/grid-list.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SpaModule } from './spa/spa.module';
import { AuthenticationRoutingComponent } from './spa/authentication/authentication-routing/authentication-routing.component';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './spa/authentication/authentication.module';

const routes: Routes = [
  {path:'authentication',component:AuthenticationRoutingComponent,children:authRoutes },
  ]
@NgModule({
  declarations: [
    AppComponent,
    RequestListComponent,
    RequestDetailsComponent,
    RolesComponent,
    DateSearchComponent,
    RadioSearchComponent,
    NestedDropdownComponent,
    GridListComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SpaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
