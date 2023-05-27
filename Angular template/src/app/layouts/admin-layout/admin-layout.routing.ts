import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from 'app/authentication/login/login.component';
import { RegisterComponent } from 'app/employee/register/register.component';
import { MaterialListComponent } from 'app/material/material-list/material-list.component';
import { MaterialUpdateFormComponent } from 'app/material/material-update-form/material-update-form.component';
import { SearchMaterialComponent } from 'app/material/search-material/search-material.component';
import { OrderComponent } from 'app/order/order/order.component';
import { OrdersHistoryComponent } from 'app/employee/orders-history/orders-history.component';
import { TasksHistoryComponent } from 'app/employee/tasks-history/tasks-history.component';
import { DetailsComponent } from 'app/employee/details/details.component';
import { ListComponent } from 'app/employee/list/list.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'material-list', component: MaterialListComponent },
    { path: 'material-update-form', component: MaterialUpdateFormComponent },
    { path: 'search-material', component: SearchMaterialComponent },
    { path: 'employee-list', component: ListComponent },
    { path: 'employee-details', component: DetailsComponent },
    { path: 'order', component: OrderComponent },
    { path: 'orders-history', component: OrdersHistoryComponent },
    { path: 'tasks-history', component: TasksHistoryComponent },
];
