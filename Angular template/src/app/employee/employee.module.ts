import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from 'app/layouts/admin-layout/admin-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RegisterComponent } from './register/register.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';
import { TasksHistoryComponent } from './tasks-history/tasks-history.component';



@NgModule({
  declarations: [EmployeeDetailsComponent,EmployeeListComponent,RegisterComponent, UpdateEmployeeComponent, OrdersHistoryComponent, TasksHistoryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ]
})
export class EmployeeModule { }