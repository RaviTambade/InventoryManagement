import { NgModule } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { EditInitialRequestComponent } from './edit-initial-request/edit-initial-request.component';
import { FormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { Routes } from '@angular/router';
import { SupervisorsDashboardComponent } from './supervisors-dashboard/supervisors-dashboard.component';
import { MonthlyRequestsComponent } from './charts/monthly-requests/monthly-requests.component';
import { ChartsModule } from './charts/charts.module';

export const supervisorsRoutes: Routes = [
   { path: 'dashboard', component: SupervisorsDashboardComponent },
  { path: 'editinitialrequest/:cartId', component: EditInitialRequestComponent },
  { path: 'editrequest/:id', component: EditRequestComponent },
  { path: 'request/:id', component: RequestComponent },
  { path: 'requestdetails/:requestid', component: RequestDetailsComponent },
  { path: 'requesthistory', component: RequestsHistoryComponent },
  { path: 'store', component: StoreComponent }
]

@NgModule({
  declarations: [
    StoreComponent,
    RequestsHistoryComponent,
    RequestDetailsComponent,
    EditRequestComponent,
    EditInitialRequestComponent,
    RequestComponent,
    SupervisorsDashboardComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  providers: [DatePipe],

})
export class SupervisorModule { }
