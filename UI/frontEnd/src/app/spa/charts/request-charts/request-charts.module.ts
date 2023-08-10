import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { WeeklyReportComponent } from './weekly-report/weekly-report.component';
import { MonthlyReportComponent } from './monthly-report/monthly-report.component';
import { YearlyReportComponent } from './yearly-report/yearly-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WeeklyReportComponent,
    MonthlyReportComponent,
    YearlyReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  exports:[WeeklyReportComponent,MonthlyReportComponent,YearlyReportComponent]
})
export class RequestChartsModule { }
