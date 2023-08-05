import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsReportComponent } from './requests-report/requests-report.component';
import { MaterialReportComponent } from './material-report/material-report.component';
import { TasksReportComponent } from './tasks-report/tasks-report.component';
import { NgChartsModule } from 'ng2-charts';
import { MaterialsReportComponent } from './materials-report/materials-report.component';



@NgModule({
  declarations: [
    RequestsReportComponent,
    MaterialReportComponent,
    TasksReportComponent,
    MaterialsReportComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule.forRoot({ defaults: { } }),
    NgChartsModule,
  ],
  exports:[MaterialReportComponent,RequestsReportComponent]
})
export class ChartsModule { }
