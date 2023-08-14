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
import { ChartComponent } from './chart/chart.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MaterialChartComponent } from './material-chart/material-chart.component';
import { ChartsModule } from './spa/charts/charts.module';
import { PopupComponent } from './popup/popup.component';
import { RequestReport } from './RequestReport';
import { RequestChartsModule } from './spa/charts/request-charts/request-charts.module';
import { InsertEmployeesModule } from './spa/admin/insert-employees/insert-employees.module';
import { AdminModule } from './spa/admin/admin.module';

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
    PaginationComponent,
    ChartComponent,
    PieChartComponent,
    MaterialChartComponent,
    PopupComponent
  ],
  imports: [
    NgChartsModule.forRoot({ defaults: { } }),
    NgChartsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SpaModule,
    ChartsModule,
    RequestChartsModule,
    InsertEmployeesModule,
    AdminModule
  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
