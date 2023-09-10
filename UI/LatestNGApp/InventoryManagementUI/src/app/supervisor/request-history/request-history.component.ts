import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent {

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
  orderPicked=false;
  currentIndex = 0;
  endIndex = 0;
  arrLength = 0;
  size: number = 0;


  constructor( private _requestsvc: RequestService,private router:Router) {
    this.result = [];
    this.requests = [];
    this.carts = [];
    this.data = [];
  }


  ngOnInit(): void {
    this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
      if (res) {
        // Date.parse(res.date)
        this.result = res;
        console.log(res);
        this.request = true;
        this.arrLength = this.result.length;
        this.size = 5;
        this.currentIndex = 0;
        this.endIndex = this.currentIndex + this.size;
        this.requests = this.result.slice(this.currentIndex, this.endIndex);
      }
    })

  }

  selectRequest(id: number) {
    this._requestsvc.setSelectedRequestId(id);
  }

  next() {
    this.currentIndex = this.currentIndex + this.size;
    this.endIndex = this.currentIndex + this.size;
    this.requests = this.result.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledPrev = false;
    if (this.endIndex >= this.arrLength)
    {
      this.isDisabledNext = true;
    }
  }

  previous() {
    this.currentIndex = this.currentIndex - this.size;
    this.endIndex = this.currentIndex + this.size;
    this.requests = this.result.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledNext = false;
    if (this.currentIndex <= 0) 
    {
      this.isDisabledPrev = true;
    }


  }

  onCancelRequest(reqid: number) {
    this._requestsvc.cancelRequest(reqid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  newOrder(){
    this.router.navigate(["supervisor/store"])
  }

}

