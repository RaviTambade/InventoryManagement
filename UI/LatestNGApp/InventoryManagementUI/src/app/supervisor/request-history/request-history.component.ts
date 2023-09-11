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
  toDate=new Date();
  fromDate=new Date();
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
        if (this.requests !== null) {
          this.getUser();
          this.todaysRequestsCount();
          this.cancelledRequestsCount();
          this.deliveredRequestCount();
          this.inprogressRequestCount();
        }
        //  this.requests= this._requestsvc.getAllRequests(this.empid);
        //  this.data=this.requests;
        //  console.log(this.requests);
        //  this.todaysRequestsCount();
        //  this.cancelledRequestsCount();
        //  this.deliveredRequestCount();
        //  this.inprogressRequestCount();

      }
    })
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
  }

  inprogressRequests() {
    const inprogressrequest = this.data.filter(u => u.status === "Inprogress");
    this.requests = inprogressrequest;
  }

  deliveredRequests() {
    const deliveredrequest = this.data.filter(u => u.status === "Delivered");
    this.requests = deliveredrequest;
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
  onFromDate(){
    console.log(this.fromDate);
    if(this.fromDate)
    this.fromDateSelected=true;
  }
  onToDate(){
    console.log(this.toDate)
  }
}

