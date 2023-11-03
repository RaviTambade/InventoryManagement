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
  employeeId: number = 0;
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
    // get userId from localStorage
    const id=localStorage.getItem("userId");
    if(id){
     this.employeeId=Number.parseInt(id);
    }
  }

  ngOnInit(): void {
    this._requestsvc.getAllRequests(this.employeeId).subscribe((res) => {
      if (res) {
        this.data = res;
        //this.getUser();
        this.userIds = this.data.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
        let userIdsString = this.userIds.join(","); 
                          this._usersvc.getUserName(userIdsString).subscribe(data => {
                                                                          for (const responseItem of data) {
                                                                            const users = this.data.filter(u => u.userId === responseItem.id);
                                                                            for (const user of users) {
                                                                              user.name = responseItem.name;
                                                                            }
                                                                          }
        });
        //this.getRequestCounts();
        this.totalCount = this.data.length;
        this.cancelledCount = this.getRequestCountByStatus("Cancelled");
        this.pickedCount = this.getRequestCountByStatus("Picked");
        this.readyToDispatchCount = this.getRequestCountByStatus("Ready To Dispatch");
        this.deliveredCount = this.getRequestCountByStatus("Delivered");
        this.inprogressCount = this.getRequestCountByStatus("inprogress");
        this.myRequestsCount=this.data.filter(u => u.userId ==this.employeeId ).length;

        // todaysRequests;
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        const todaysRequests = this.data.filter(request => {
        const requestDate = request.date.toString().split('T')[0];
        return requestDate == todayString;
        })
        this.todaysCount = todaysRequests.length;

        //filter requests
        this.onFilterRequests('inprogress');
      }
    })
  }

getRequestCountByStatus(status: string): number {
  return this.data.filter(u => u.status === status && u.userId === this.employeeId).length;
}

  onFromDateChange() {
  }
  onToDateChange() {
    let specificData = this.data.filter(
      m => new Date(m.date) >= new Date(this.fromDate) && new Date(m.date) <= new Date(this.toDate)
    );
    this.requests = specificData;
    this._requestsvc.setSelectedRequestId(0);
  }

 
  
  onReceiveAllRequests(){
    this.otherSupervisor=true;
    this.requests=this.data;
  }

  onAllTodaysRequests() {
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

  onFilterMyRequests(){
    this.otherSupervisor=false;
    this.requests = this.data.filter(u => u.userId === this.employeeId);
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }

  onFilterRequests(status:string){
    this.otherSupervisor=false;
    this.requests = this.data.filter(u => u.status === status  && u.userId===this.employeeId);
    const value = this.requests[0].id
    this._requestsvc.setSelectedRequestId(value);
  }

  onSelectRequest(id: number) {
    this._requestsvc.setSelectedRequestId(id);
  }

  onCancelRequest(reqid: number) {
    this._requestsvc.cancelRequest(reqid).subscribe((res) => {
      window.location.reload();
    })
  }

  onNewOrder() {
    this.router.navigate(["shared/store"])
  }
  onRemove(id:number){
    this._requestsvc.deleteRequest(id).subscribe((res) => {
      window.location.reload();
    })  }
}

