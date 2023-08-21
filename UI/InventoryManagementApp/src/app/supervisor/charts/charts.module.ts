import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearlyRequestsComponent } from './yearly-requests/yearly-requests.component';
import { MonthlyRequestsComponent } from './monthly-requests/monthly-requests.component';
import { WeeklyRequestsComponent } from './weekly-requests/weekly-requests.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    YearlyRequestsComponent,
    MonthlyRequestsComponent,
    WeeklyRequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[YearlyRequestsComponent,MonthlyRequestsComponent,WeeklyRequestsComponent]
})
export class ChartsModule { }
