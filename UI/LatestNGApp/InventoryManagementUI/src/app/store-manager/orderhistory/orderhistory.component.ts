import { Component } from '@angular/core';
import { Order } from 'src/app/Models/Order';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent {

  orders: Order[] = [];
  data: Order[] = [];
  userIds: any[] = [];
  completedOrdercount: number = 0;
  pendingOrdercount: number = 0;
  request:boolean=false;
  orderCount:number=0;
  employeeId:number=0;

  constructor(private _orderSvc: OrderService, private _usersvc: UserService) {
    this.orders = [];
    this.data = [];
    this.getEmployeeId();
    
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getEmployeeId(){
    const id=localStorage.getItem("userId");
    if(id){
     this.employeeId=Number.parseInt(id);
    }
  }
 
  getOrders() {
    this._orderSvc.getOrders(this.employeeId).subscribe((res) => {
      console.log(res);
      this.data=res;
      this.getUser();
      this.allOrderCount(); 
      this.completedCount();
      this.pendingCount();
      this.pendingOrders();
    })
  }

  getUser() {
    this.userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index);
    let userIdsString = this.userIds.join(","); 
      this._usersvc.getUserName(userIdsString).subscribe(data => {
        for (const responseItem of data) {
          const users = this.data.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
      });
    
  }

  allOrderCount(){
    this.orderCount = this.data.length;
  }
  completedCount() {
    this.completedOrdercount = this.data.filter(u => u.status !== "inprogress").length;
  }

  pendingCount() {
    this.pendingOrdercount = this.data.filter(u => u.status === "inprogress").length;
  }

  completedOrders() {
    this.request=false;
    this.orders = this.data.filter(u => u.status !== "inprogress");
    const orderId = this.orders[0].id;
    this._orderSvc.setSelectedOrderId(orderId); 
  }

  pendingOrders() {
    this.request=true;
    this.orders  = this.data.filter(u => u.status === "inprogress");
    const orderId = this.orders[0].id;
    this._orderSvc.setSelectedOrderId(orderId);
  }

  allOrders(){
    this.orders =this.data;
    const orderId = this.orders[0].id;
    this._orderSvc.setSelectedOrderId(orderId);
  }
  
  selectCompletedOrder(id: number) {
    this._orderSvc.setSelectedOrderId(id);
  }
}
