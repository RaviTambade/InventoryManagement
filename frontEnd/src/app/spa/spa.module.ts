import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterContainerComponent } from './router-container/router-container.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { MaterialsComponent } from './materials/materials.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';



@NgModule({
  declarations: [
    RouterContainerComponent,
    HomeComponent,
    EmployeesComponent,
    MaterialsComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SpaModule { }
