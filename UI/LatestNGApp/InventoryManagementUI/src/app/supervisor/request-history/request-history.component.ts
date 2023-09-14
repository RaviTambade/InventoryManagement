import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RequestDetails } from 'src/app/Models/RequestDetails';
import { RequestService } from 'src/app/Services/request.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent {

  userIds: number[] = []
  requests: RequestDetails[];
  data: RequestDetails[];
  empid: number = 11;
  todaysCount: number = 0;
  cancelledCount: number = 0;
  deliveredCount: number = 0;
  inprogressCount: number = 0;
  toDate:string="";
  fromDate:string="";
  fromDateSelected:boolean=false;
  constructor(private _requestsvc: RequestService, private _usersvc: UserService, private router: Router) {
    this.requests = [];
    this.data = [];
  }

  ngOnInit(): void {
    this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
      if (res) {
        this.requests = res;
        this.data = res;
        this.requests=this.data.slice(0,10);
        if (this.requests !== null) {
          this.getUser();
          this.todaysRequestsCount();
          this.cancelledRequestsCount();
          this.deliveredRequestCount();
          this.inprogressRequestCount();
        }
        console.log(this.fromDate);
        console.log(this.toDate);
      }
    })
  }
  onFromDateChange(){
    console.log(this.fromDate);
  }
  onToDateChange(){
    console.log(this.toDate);
    console.log(this.fromDate);
    
    let specificData = this.data.filter(
      m => new Date(m.date) >= new Date(this.fromDate) && new Date(m.date) <= new Date(this.toDate)
      );
      console.log(specificData)
      this.requests= specificData;
      this._requestsvc.setSelectedRequestId(0);
  }
  todaysRequestsCount() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0].replace(/-/g, '/');;
    const todaysRequests = this.data.filter(request => {
      const requestDate = request.date.toString().split('T')[0];
      return requestDate == todayString;
    })
    this.todaysCount = todaysRequests.length;

  }
  cancelledRequestsCount() {
    const cancelledrequest = this.data.filter(u => u.status === "Cancelled").length;
    this.cancelledCount = cancelledrequest;
  }
  deliveredRequestCount() {
    const deliveredRequest = this.data.filter(u => u.status === "Delivered").length;
    this.deliveredCount = deliveredRequest;
  }
  inprogressRequestCount() {
    const inprogressRequest = this.data.filter(u => u.status === "Inprogress").length;
    this.inprogressCount = inprogressRequest;
  } 

  todaysRequests() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0].replace(/-/g, '/');;
    const todaysRequests = this.data.filter(request => {
      const requestDate = request.date.toString().split('T')[0];
      return requestDate == todayString;
    })
    this.requests = todaysRequests;
  }

  cancelledRequests() {
    const cancelledrequest = this.data.filter(u => u.status === "Cancelled");
    this.requests = cancelledrequest;
    this._requestsvc.setSelectedRequestId(0);

  }

  inprogressRequests() {
    const inprogressrequest = this.data.filter(u => u.status === "Inprogress");
    this.requests = inprogressrequest;
    this._requestsvc.setSelectedRequestId(0);
  }

  deliveredRequests() {
    const deliveredrequest = this.data.filter(u => u.status === "Delivered");
    this.requests = deliveredrequest;
    this._requestsvc.setSelectedRequestId(0);
  }

  getUser() {
    const userIds = this.requests.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    this.userIds = userIds;
    for (const userId of this.userIds) {
      this._usersvc.getUser(userId).subscribe(data => {
        for (const responseItem of data) {
          const users = this.requests.filter(u => u.userId === responseItem.id);
          for (const user of users) {
            user.name = responseItem.name;
          }
        }
      });
    }
  }

  selectRequest(id: number) {
    this._requestsvc.setSelectedRequestId(id);
  }

  onCancelRequest(reqid: number) {
    this._requestsvc.cancelRequest(reqid).subscribe((res) => {
      window.location.reload();
    })
  }

  newOrder() {
    this.router.navigate(["supervisor/store"])
  }

}

