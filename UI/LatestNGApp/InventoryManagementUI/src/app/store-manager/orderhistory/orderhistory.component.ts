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
  storemanagerid: number = 1;
  completedOrdercount: number = 0;
  pendingOrdercount: number = 0;
  request:boolean=false;
  

  constructor(private _orderSvc: OrderService, private _usersvc: UserService) {
    this.orders = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.getOrders()

  }

  getOrders() {
    this._orderSvc.getOrders(this.storemanagerid).subscribe((res) => {
      console.log(res);
      this.data=res;
      
      this.getUser();
      this.completedCount();
      this.pendingCount();
      this.pendingOrders();
      this.completedOrders();
    })
  }

  getUser() {
    const userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    this.userIds = userIds;
    console.log(this.userIds);
    for (const userId of this.userIds) {
      this._usersvc.getUser(userId).subscribe(data => {
        for (const responseItem of data) {
          const users = this.data.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
      });
    }
     //by default pending
     const pendingOrders = this.data.filter(u => u.status === "inprogress");
     this.orders = pendingOrders;
     console.log(this.orders)
  }


  completedCount() {
    const completed = this.data.filter(u => u.status !== "inprogress").length;
    this.completedOrdercount = completed;
  }

  pendingCount() {
    const pending = this.data.filter(u => u.status === "inprogress").length;
    this.pendingOrdercount = pending;
  }

  completedOrders() {
    this.request=false;
    const completedOrders = this.data.filter(u => u.status !== "inprogress");
    this.orders = completedOrders;
    this._orderSvc.setSelectedOrderId(0);
  }
  pendingOrders() {
    this.request=true;
    const pendingOrders = this.data.filter(u => u.status === "inprogress");
    this.orders = pendingOrders;
    this._orderSvc.setSelectedOrderId(0);
  }
  

  // onFromDateChange(){
  //   console.log(this.fromDate);
  // }
  // onToDateChange(){
  //   console.log(this.toDate);
  //   console.log(this.fromDate);

  //   let specificData = this.data.filter(
  //     m => new Date(m.date) >= new Date(this.fromDate) && new Date(m.date) <= new Date(this.toDate)
  //     );
  //     console.log(specificData)
  //     this.requests= specificData;
  //     this._requestsvc.setSelectedRequestId(0);
  // }


  // todaysRequests() {
  //   const today = new Date();
  //   const todayString = today.toISOString().split('T')[0].replace(/-/g, '/');;
  //   const todaysRequests = this.data.filter(request => {
  //     const requestDate = request.date.toString().split('T')[0];
  //     return requestDate == todayString;
  //   })
  //   this.requests = todaysRequests;
  // }

  // cancelledRequests() {
  //   const cancelledrequest = this.data.filter(u => u.status === "Cancelled");
  //   this.requests = cancelledrequest;
  //   this._requestsvc.setSelectedRequestId(0);

  // }

  // inprogressRequests() {
  //   const inprogressrequest = this.data.filter(u => u.status === "Inprogress");
  //   this.requests = inprogressrequest;
  //   this._requestsvc.setSelectedRequestId(0);
  // }

  // deliveredRequests() {
  //   const deliveredrequest = this.data.filter(u => u.status === "Delivered");
  //   this.requests = deliveredrequest;
  //   this._requestsvc.setSelectedRequestId(0);
  // }

  // getUser() {
  //   const userIds = this.requests.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
  //   this.userIds = userIds;
  //   for (const userId of this.userIds) {
  //     this._usersvc.getUser(userId).subscribe(data => {
  //       for (const responseItem of data) {
  //         const users = this.requests.filter(u => u.userId === responseItem.id);
  //         for (const user of users) {
  //           user.name = responseItem.name;
  //         }
  //       }
  //     });
  //   }
  // }

  selectCompletedOrder(id: number) {
    this._orderSvc.setSelectedOrderId(id);
  }



}
