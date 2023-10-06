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
  pickedCount: number = 0;
  readyToDispatchCount: number = 0;
  totalCount:number = 0;
  myRequestsCount:number=0;
  toDate: string = "";
  fromDate: string = "";
  fromDateSelected: boolean = false;
  otherSupervisor: boolean=false;


  constructor(private _requestsvc: RequestService, private _usersvc: UserService, private router: Router) {
    this.requests = [];
    this.data = [];
  }

  ngOnInit(): void {
    this.getRequests();
    console.log("function called");
  }

  getRequests() {
    this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
      console.log("function called");
      console.log(res);
      if (res) {
        this.requests = res;
        this.data = res;
        console.log(this.data)
        this.getUser();
        this.requestCounts();
        this.inprogressRequests();
      }
    })
  }

  requestCounts(){
     this.totalCount=this.data.length; 
    this.myRequestsCount=this.data.filter(u => u.userId ==this.empid ).length;
    this.cancelledCount = this.data.filter(u => u.status === "Cancelled"  && u.userId===this.empid).length;
    this.pickedCount = this.data.filter(u => u.status === "Picked"  && u.userId===this.empid).length;
    this.readyToDispatchCount = this.data.filter(u => u.status === "Ready To Dispatch" && u.userId===this.empid).length;
    this.deliveredCount = this.data.filter(u => u.status === "Delivered"  && u.userId===this.empid).length;
    this.inprogressCount = this.data.filter(u => u.status === "inprogress" && u.userId===this.empid).length;

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

  todaysRequestsCount() {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const todaysRequests = this.data.filter(request => {
      const requestDate = request.date.toString().split('T')[0];
      return requestDate == todayString;
    })
    this.todaysCount = todaysRequests.length;
  }
  
  allRequests(){
    this.otherSupervisor=true;
    const totalRequests=this.data;
    this.requests=totalRequests;
  }

  todaysRequests() {
    this.otherSupervisor=false;
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const todaysRequests = this.data.filter(request => {
      const requestDate = request.date.toString().split('T')[0];
      return requestDate == todayString;
    })
    this.requests = todaysRequests;
    console.log(this.requests.length>1)
    if(this.requests.length<1){
    this._requestsvc.setSelectedRequestId(0);
    }
    else{
      const value = this.requests[0].id;
      this._requestsvc.setSelectedRequestId(value);  
    }
  }

  myRequests(){
    this.otherSupervisor=false;
    const myRequests = this.data.filter(u => u.userId === this.empid);
    this.requests = myRequests;
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }
  cancelledRequests() {
    this.otherSupervisor=false;
    const cancelledrequest = this.data.filter(u => u.status === "Cancelled"  && u.userId===this.empid);
    this.requests = cancelledrequest;
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }

  inprogressRequests() {
    this.otherSupervisor=false;
    const inprogressrequest = this.data.filter(u => u.status === "inprogress"  && u.userId===this.empid);
    this.requests = inprogressrequest;
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }
  pickedRequests() {
    this.otherSupervisor=false;
    const inprogressrequest = this.data.filter(u => u.status === "Picked" && u.userId===this.empid);
    this.requests = inprogressrequest;
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }
  readyToDispatchRequests() {
    this.otherSupervisor=false;
    const inprogressrequest = this.data.filter(u => u.status === "Ready To Dispatch"  && u.userId===this.empid);
    this.requests = inprogressrequest;
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }
  deliveredRequests() {
    this.otherSupervisor=false;
    const deliveredrequest = this.data.filter(u => u.status === "Delivered"  && u.userId===this.empid);
    this.requests = deliveredrequest;
    const value = this.requests[0].id;
    console.log(value);
    this._requestsvc.setSelectedRequestId(value);
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
  onRemove(id:number){
    console.log(id);
    this._requestsvc.deleteRequest(id).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })  }
}

