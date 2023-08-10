import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { RequestChartsModule } from './request-charts/request-charts.module';
import { RouterComponent } from './router/router.component';
import { MonthlyReportComponent } from './request-charts/monthly-report/monthly-report.component';
import { WeeklyReportComponent } from './request-charts/weekly-report/weekly-report.component';
import { YearlyReportComponent } from './request-charts/yearly-report/yearly-report.component';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyComponent } from './task-charts/monthly/monthly.component';
import { WeeklyComponent } from './task-charts/weekly/weekly.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes=
  [   //{path:'', redirectTo:'home',pathMatch:"full"},
      { path: 'monthlyrequests', component: MonthlyReportComponent },
      { path: 'weeklyrequests', component: WeeklyReportComponent },
      { path: 'yearlyrequests', component: YearlyReportComponent },

      { path: 'monthlytasks', component: MonthlyComponent },
      { path: 'weeklytasks', component: WeeklyComponent },
      { path: 'yearlytasks', component: YearlyReportComponent },
   
    ];

@NgModule({
  declarations: [
    RouterComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule.forRoot({ defaults: { } }),
    NgChartsModule,
    RouterModule.forRoot(routes),
    RequestChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[RequestChartsModule,RouterComponent]
})
export class ChartsModule { }
