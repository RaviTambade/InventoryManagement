import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { EditInitialRequestComponent } from './edit-initial-request/edit-initial-request.component';



@NgModule({
  declarations: [
    StoreComponent,
    RequestsHistoryComponent,
    RequestDetailsComponent,
    EditRequestComponent,
    EditInitialRequestComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SupervisorModule { }
