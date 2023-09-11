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

  userIds:number[]=[]
  requests: RequestDetails[];
  result: any[];
  carts: any[];
  data: RequestDetails[];
  empid: number = 11;
  cart: boolean | undefined;
  emptycart: boolean | undefined;
  request: boolean | undefined;
  names: any = [];
  employees: any = [];
  isDisabledPrev = false;
  isDisabledNext = false;
  orderPicked = false;
  currentIndex = 0;
  endIndex = 0;
  arrLength = 0;
  size: number = 0;
  todaysCount:number=0;
  cancelledCount:number=0;
  deliveredCount:number=0;
  inprogressCount:number=0;
  date:string =  '2023-09-07';
  cancelled:any =[];

  constructor(private _requestsvc: RequestService,private _usersvc:UserService, private router: Router) {
    this.result = [];
    this.requests = [];
    this.carts = [];
    this.data = [];
  }


  ngOnInit(): void {
    // this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
    //   if (res) {
    //     this.requests = res;
        // if(this.requests!==null){
        //   this.todaysRequestsCount();
        //   this.cancelledRequestsCount();
        //   this.deliveredRequestCount();
        //   this.inprogressRequestCount();
        // }
       this.requests= this._requestsvc.getAllRequests(this.empid);
       this.data=this.requests;
       console.log(this.requests);
       this.todaysRequestsCount();
       this.cancelledRequestsCount();
       this.deliveredRequestCount();
       this.inprogressRequestCount();
        


        // const userIds = this.requests.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
        // this.userIds=userIds;
        // console.log(this.userIds);
        // this.getUser();

        // this.request = true;


        // this.arrLength = this.result.length;
        // this.size = 5;
        // this.currentIndex = 0;
        // this.endIndex = this.currentIndex + this.size;
        // this.requests = this.result.slice(this.currentIndex, this.endIndex);
      }
    // })

  // }
  todaysRequestsCount(){
    // this.todaysCount=12
    const today=new Date();
    const todayString = today.toISOString().split('T')[0].replace(/-/g, '/');;
    console.log(todayString);
    const todaysRequests=this.data.filter(request=>{
      const requestDate=request.date.split('T')[0];
      return requestDate==todayString;
    })
    console.log(todaysRequests);
    this.todaysCount=todaysRequests.length;
 
  }
  cancelledRequestsCount(){
    const cancelledrequest = this.requests.filter(u => u.status=== "Cancelled").length;
    this.cancelledCount=cancelledrequest;
    console.log(cancelledrequest);
  }
  deliveredRequestCount(){
    const deliveredRequest = this.requests.filter(u => u.status=== "Delivered").length;
    this.deliveredCount=deliveredRequest;
    console.log(deliveredRequest);
  }
  inprogressRequestCount(){
    const inprogressRequest = this.requests.filter(u => u.status=== "Inprogress").length;
    this.inprogressCount=inprogressRequest;
    console.log(inprogressRequest);
  }

  todaysRequests(){
    const today=new Date();
    const todayString = today.toISOString().split('T')[0].replace(/-/g, '/');;
    console.log(todayString);
    const todaysRequests=this.data.filter(request=>{
      const requestDate=request.date.split('T')[0];
      return requestDate==todayString;
    })
    console.log(todaysRequests);
    this.requests=todaysRequests;
 

   
  }

  cancelledRequests(){
    const cancelled = this.data.filter(p => p.date === this.date )
    const cancelledrequest = this.data.filter(u => u.status=== "Cancelled");
    this.requests=cancelledrequest;
    console.log(this.requests);
  }

  inprogressRequests(){
    const inprogressrequest = this.data.filter(u => u.status=== "Inprogress");
    this.requests=inprogressrequest;
    console.log(this.requests);
  }

  deliveredRequests(){
    const deliveredrequest = this.data.filter(u => u.status=== "Delivered");
    this.requests=deliveredrequest;
    console.log(this.requests);
  }

  getUser(){
    for (const userId of this.userIds) {
      this._usersvc.getUser(userId).subscribe(data => {  
        console.log(`User ID ${userId}:`, data);

          for (const responseItem of data) {
            const users = this.requests.filter(u => u.userId === responseItem.id);
            console.log(users)

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

  // next() {
  //   this.currentIndex = this.currentIndex + this.size;
  //   this.endIndex = this.currentIndex + this.size;
  //   this.requests = this.result.slice(this.currentIndex, this.endIndex);
  //   //button unable disable code
  //   this.isDisabledPrev = false;
  //   if (this.endIndex >= this.arrLength) {
  //     this.isDisabledNext = true;
  //   }
  // }

  // previous() {
  //   this.currentIndex = this.currentIndex - this.size;
  //   this.endIndex = this.currentIndex + this.size;
  //   this.requests = this.result.slice(this.currentIndex, this.endIndex);
  //   //button unable disable code
  //   this.isDisabledNext = false;
  //   if (this.currentIndex <= 0) {
  //     this.isDisabledPrev = true;
  //   }


  // }

  onCancelRequest(reqid: number) {
    this._requestsvc.cancelRequest(reqid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  newOrder() {
    this.router.navigate(["supervisor/store"])
  }
}

