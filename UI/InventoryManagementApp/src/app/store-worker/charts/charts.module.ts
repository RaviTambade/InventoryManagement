import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeeklyTasksComponent } from './weekly-tasks/weekly-tasks.component';
import { MonthlyTasksComponent } from './monthly-tasks/monthly-tasks.component';
import { YearlyTasksComponent } from './yearly-tasks/yearly-tasks.component';



@NgModule({
  declarations: [
    WeeklyTasksComponent,
    MonthlyTasksComponent,
    YearlyTasksComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ChartsModule { }
