import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { LoginComponent } from 'app/authentication/login/login.component';
import { EmployeeListComponent } from 'app/employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from 'app/employee/employee-details/employee-details.component';
import { RegisterComponent } from 'app/employee/register/register.component';
import { MaterialListComponent } from 'app/material/material-list/material-list.component';
import { MaterialUpdateFormComponent } from 'app/material/material-update-form/material-update-form.component';
import { SearchMaterialComponent } from 'app/material/search-material/search-material.component';
import { SupervisorsDashboardComponent } from 'app/dashboards/supervisors-dashboard/supervisors-dashboard.component';
import { OrderComponent } from 'app/order/order/order.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: SupervisorsDashboardComponent },
    { path: 'login',        component: LoginComponent },
    { path: 'register',        component: RegisterComponent },
    { path: 'material-list',        component: MaterialListComponent },
    { path: 'material-update-form',        component: MaterialUpdateFormComponent },
    { path: 'search-material',        component: SearchMaterialComponent },
    { path: 'employee-list',   component: EmployeeListComponent },
    { path: 'employee-details',   component: EmployeeDetailsComponent },
    { path: 'order',   component: OrderComponent },
    
];
