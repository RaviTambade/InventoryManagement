import { NgModule } from '@angular/core';
import { CommonModule,  DatePipe } from '@angular/common';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { YearlyComponent } from './yearly/yearly.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WeeklyComponent,
    MonthlyComponent,
    YearlyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe],
  exports:[WeeklyComponent,MonthlyComponent,YearlyComponent]

})
export class TaskChartsModule { }
