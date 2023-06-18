import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterContainerComponent } from './router-container/router-container.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { MaterialsComponent } from './materials/materials.component';
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

const routes: Routes=
  [   {path:'', redirectTo:'home',pathMatch:"full"},
      { path: 'home', component: HomeComponent },
      { path: 'store', component: StoreComponent },
      { path: 'profile', component: ProfileComponent },
      { path:'requests', component: RequestsComponent},
      {path:'order/:id',component:OrdersComponent},
      {path:'orderdetails/:orderId',component:OrderDetailsComponent},
      {path:'requestHistory',component:RequestsHistoryComponent},
      {path:'requestDetails/:requestid',component:RequestDetailsComponent},
      {path:'orderhistory',component:OrderHistoryComponent},
      {path:'editcart/:cartId',component:EditCartComponent},


    ];

@NgModule({
  declarations: [
    RouterContainerComponent,
    HomeComponent,
    EmployeesComponent,
    MaterialsComponent,
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
    EditCartComponent
  ],
  exports:[RouterContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpaModule { }
