import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterContainerComponent } from './router-container/router-container.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { StoreComponent } from './store/store.component';
import { MyProfleComponent } from './my-profle/my-profle.component';
import { RequestsComponent } from './requests/requests.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { RequestsHistoryComponent } from './requests-history/requests-history.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { RequestDetailsComponent } from './request-details/request-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { EditCartComponent } from './edit-cart/edit-cart.component';
import { EditRequestComponent } from './edit-request/edit-request.component';
import { TaskshistoryComponent } from './taskshistory/taskshistory.component';
import { InsertMaterialComponent } from './insert-material/insert-material.component';
import { InsertEmployeeComponent } from './insert-employee/insert-employee.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UpdateMatrialComponent } from './update-matrial/update-matrial.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileInfoFormComponent } from './admin/insert-employees/profile-info-form/profile-info-form.component';

const routes: Routes=
  [   {path:'', redirectTo:'home',pathMatch:"full"},
      { path: 'home', component: HomeComponent },
      { path: 'store', component: StoreComponent },
      { path: 'profile', component: ProfileComponent },
      { path:'requests', component: RequestsComponent},
      {path:'order/:id',component:OrdersComponent},
      {path:'orderdetails/:requestid',component:OrderDetailsComponent},
      {path:'requestHistory',component:RequestsHistoryComponent},
      {path:'requestDetails/:requestid',component:RequestDetailsComponent},
      {path:'requestDetails',component:RequestDetailsComponent},
      {path:'taskshistory',component:TaskshistoryComponent},
      {path:'taskdetails/:taskid',component:TaskDetailsComponent},
      {path:'orderhistory',component:OrderHistoryComponent},
      {path:'editcart/:cartId',component:EditCartComponent},
      {path:'editRequest/:id',component:EditRequestComponent},
      {path:'updatematerial/:id',component:UpdateMatrialComponent},
      {path:'profileform',component:ProfileInfoFormComponent},
    ];

@NgModule({
  declarations: [
    RouterContainerComponent,
    HomeComponent,
    ProfileComponent,
    OrdersComponent,
    StoreComponent,
    MyProfleComponent,
    RequestsComponent,
    OrderDetailsComponent,
    RequestsHistoryComponent,
    CartDetailsComponent,
    RequestDetailsComponent,
    OrderHistoryComponent,
    EditCartComponent,
    EditRequestComponent,
    TaskshistoryComponent,
    InsertMaterialComponent,
    InsertEmployeeComponent,
    TaskDetailsComponent,
    UpdateMatrialComponent,
    WarehouseComponent
  ],
  exports:[RouterContainerComponent,InsertMaterialComponent],
  imports: [
    NgChartsModule.forRoot({ defaults: { } }),
    NgChartsModule,
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,

  ],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false }}],

})
export class SpaModule { }
