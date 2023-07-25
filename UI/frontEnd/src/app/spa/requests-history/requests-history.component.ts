import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { RequestService } from '../request.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests-history',
  templateUrl: './requests-history.component.html',
  styleUrls: ['./requests-history.component.css']
})
export class RequestsHistoryComponent {
  requests: any[];
  result: any[];
  carts: any[];
  data: any[];
  empid: number = 12;
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


  constructor(private _cartsvc: CartService, private _requestsvc: RequestService, private _ordersvc: OrderService, private router: Router) {
    this.result = [];
    this.requests = [];
    this.carts = [];
    this.data = [];

  }


  ngOnInit(): void {
    this._cartsvc.getCarts(this.empid).subscribe((res) => {
      console.log(res);
      this.data = res;
      if (this.data.length == 0) {
        this.emptycart = true
      }
      else {
        this.cart = true;
        this.data?.reverse();
        this.carts = this.data;
      }
    })

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
  onRemove(id: number) {
    this._cartsvc.remove(id).subscribe((res) => {
      if (res) {
        window.location.reload();
      }
    })
  }
  onCancelRequest(reqid: number) {
    this._requestsvc.cancelRequest(reqid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  onOrder() {
    this._ordersvc.order(this.empid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }
  onRemoveAll() {
    this._cartsvc.removeAll(this.empid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }
  onEdit(cartid: number) {
    this.router.navigate(['editcart', cartid]);

  }
  onView(requestid: number) {
    this.router.navigate(['requestDetails', requestid]);

  }


}
