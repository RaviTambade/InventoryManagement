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

  orders:Order[]=[];
  data:Order[]=[];
  userIds:any[]=[];
  completedOrders:Order[]=[];
  storemanagerid:number=1;

  constructor(private _orderSvc: OrderService,private _usersvc:UserService) {
    this.orders = [];
    this.data = [];
  }

  ngOnInit(): void {
    this._orderSvc.getOrders(this.storemanagerid).subscribe((res) => {
      console.log(res);
      this.orders=res;
      console.log(this.orders)
          this.getUser();

    })

    // this._orderSvc.getCompletedOrders(1).subscribe((res) => {
    //   console.log(res);
    //   this.completedOrders=res;
    // })


  }

  getUser() {
    const userIds = this.completedOrders.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    this.userIds = userIds;
    console.log(this.userIds);
    for (const userId of this.userIds) {
      this._usersvc.getUser(userId).subscribe(data => {
        for (const responseItem of data) {
          const users = this.completedOrders.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
        console.log(this.completedOrders);
      });
    }
  }


  completed(){

  }

  pending(){
    
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
  // todaysRequestsCount() {
  //   const today = new Date();
  //   const todayString = today.toISOString().split('T')[0].replace(/-/g, '/');;
  //   const todaysRequests = this.data.filter(request => {
  //     const requestDate = request.date.toString().split('T')[0];
  //     return requestDate == todayString;
  //   })
  //   this.todaysCount = todaysRequests.length;

  // }
  // cancelledRequestsCount() {
  //   const cancelledrequest = this.data.filter(u => u.status === "Cancelled").length;
  //   this.cancelledCount = cancelledrequest;
  // }
  // deliveredRequestCount() {
  //   const deliveredRequest = this.data.filter(u => u.status === "Delivered").length;
  //   this.deliveredCount = deliveredRequest;
  // }
  // inprogressRequestCount() {
  //   const inprogressRequest = this.data.filter(u => u.status === "Inprogress").length;
  //   this.inprogressCount = inprogressRequest;
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

  // onCancelRequest(reqid: number) {
  //   this._requestsvc.cancelRequest(reqid).subscribe((res) => {
  //     window.location.reload();
  //   })
  // }

  // newOrder() {
  //   this.router.navigate(["supervisor/store"])
  // }


}
