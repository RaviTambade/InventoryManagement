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
  empid: number = 21;
  todaysCount: number = 0;
  cancelledCount: number = 0;
  deliveredCount: number = 0;
  inprogressCount: number = 0;
  totalCount:number = 0;
  myRequestsCount:number=0;
  toDate: string = "";
  fromDate: string = "";
  fromDateSelected: boolean = false;
  constructor(private _requestsvc: RequestService, private _usersvc: UserService, private router: Router) {
    this.requests = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.getRequests();
  }
  getRequests() {
    this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
      if (res) {
        this.requests = res;
        this.data = res;
        console.log(this.data)
        this.getUser();
        this.requests = this.data.slice(0, 10);
        this.allRequestCount();
        this.myRequestCount();
        this.todaysRequestsCount();
        this.cancelledRequestsCount();
        this.deliveredRequestCount();
        this.inprogressRequestCount();
      }


    })
  }
  onFromDateChange() {
    console.log(this.fromDate);
  }
  onToDateChange() {
    console.log(this.toDate);
    console.log(this.fromDate);

    let specificData = this.data.filter(
      m => new Date(m.date) >= new Date(this.fromDate) && new Date(m.date) <= new Date(this.toDate)
    );
    console.log(specificData)
    this.requests = specificData;
    this._requestsvc.setSelectedRequestId(0);
  }

  allRequestCount(){
    const requestCount=this.data.length;
    this.totalCount=requestCount;
  }
  myRequestCount(){
    const myRequestCount=this.data.filter(u => u.userId ==this.empid ).length;
    this.myRequestsCount=myRequestCount;
  }

  todaysRequestsCount() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
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
    const inprogressRequest = this.data.filter(u => u.status === "inprogress").length;
    this.inprogressCount = inprogressRequest;
  }

  allRequests(){
    const totalRequests=this.data;
    console.log(totalRequests);
    this.requests=totalRequests;
  }

  todaysRequests() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const todaysRequests = this.data.filter(request => {
      const requestDate = request.date.toString().split('T')[0];
      return requestDate == todayString;
    })
    this.requests = todaysRequests;
  }

  myRequests(){
    const myRequests = this.data.filter(u => u.userId === this.empid);
    this.requests = myRequests;
    this._requestsvc.setSelectedRequestId(0); 
  }
  cancelledRequests() {
    const cancelledrequest = this.data.filter(u => u.status === "Cancelled");
    this.requests = cancelledrequest;
    this._requestsvc.setSelectedRequestId(0);

  }

  inprogressRequests() {
    const inprogressrequest = this.data.filter(u => u.status !== "Delivered" && "Cancelled");
    this.requests = inprogressrequest;
    this._requestsvc.setSelectedRequestId(0);
  }

  deliveredRequests() {
    const deliveredrequest = this.data.filter(u => u.status === "Delivered");
    this.requests = deliveredrequest;
    this._requestsvc.setSelectedRequestId(0);
  }

  getUser() {
    const userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
    this.userIds = userIds;
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
    this.router.navigate(["shared/store"])
  }

}

