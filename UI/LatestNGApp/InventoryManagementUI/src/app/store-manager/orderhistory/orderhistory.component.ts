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

    //get existing empolyee id from local storage
    const id=localStorage.getItem("userId");
    if(id){
     this.employeeId=Number.parseInt(id);
    }
  }

  ngOnInit(): void {
    this._orderSvc.getOrders(this.employeeId).subscribe((res) => {
                              this.data=res;
                              //get user
                              this.userIds = this.data.map(item => item.userId)
                                                      .filter((value, index, self) => self.indexOf(value) === index);
                                                                            let userIdsString = this.userIds.join(","); 
                                                                              this._usersvc.getUserName(userIdsString).subscribe(data => {
                                                                                                                        for (const responseItem of data) {
                                                                                                                          const users = this.data.filter(u => u.userId === responseItem.id);
                                                                                                                          for (const user of users) {
                                                                                                                            user.name = responseItem.name;
                                                                                                                          }
                                                                                                                        }
                                                                                                                      }); 

                              this.orderCount = this.data.length;
                              this.completedOrdercount = this.data.filter(u => u.status !== "inprogress").length;
                              this.pendingOrdercount = this.data.filter(u => u.status === "inprogress").length;
                              this.pendingOrdercount = this.data.filter(u => u.status === "inprogress").length; 
                              this.onPendingOrders();
                            })
  }
  
  onCompletedOrders() {
    this.request=false;
    this.orders = this.data.filter(u => u.status !== "inprogress");
    const orderId = this.orders[0].id;
    this._orderSvc.setSelectedOrderId(orderId); 
  }

  onPendingOrders() {
    this.request=true;
    this.orders  = this.data.filter(u => u.status === "inprogress");
    const orderId = this.orders[0].id;
    this._orderSvc.setSelectedOrderId(orderId);
  }

  onReceiveAllOrders(){
    this.orders =this.data;
    const orderId = this.orders[0].id;
    this._orderSvc.setSelectedOrderId(orderId);
  }
    
  onSelectCompletedOrder(id: number) {
    this._orderSvc.setSelectedOrderId(id);
  }
}
