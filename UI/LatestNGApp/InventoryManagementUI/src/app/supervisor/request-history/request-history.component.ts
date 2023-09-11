import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent {

  userIds:number[]=[]
  requests: any[];
  result: any[];
  carts: any[];
  data: any[];
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


  constructor(private _requestsvc: RequestService,private _usersvc:UserService, private router: Router) {
    this.result = [];
    this.requests = [];
    this.carts = [];
    this.data = [];
  }


  ngOnInit(): void {
    this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
      if (res) {
        this.requests = res;
        console.log(res);


        const userIds = this.requests.map(item => item.userId).filter((value, index, self) => self.indexOf(value) === index); // Filter duplicates
        this.userIds=userIds;
        console.log(this.userIds);
        this.getUser();

        this.request = true;
        // this.arrLength = this.result.length;
        // this.size = 5;
        // this.currentIndex = 0;
        // this.endIndex = this.currentIndex + this.size;
        // this.requests = this.result.slice(this.currentIndex, this.endIndex);
      }
    })

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

