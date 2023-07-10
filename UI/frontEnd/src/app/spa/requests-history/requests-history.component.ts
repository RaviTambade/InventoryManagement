import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { RequestService } from '../request.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  empid: number = 11;
  cart: boolean | undefined;
  emptycart: boolean | undefined;
  request: boolean | undefined;


  names: any = [];
  employees: any = [];


  constructor(private _cartsvc: CartService, private _requestsvc: RequestService, private _ordersvc: OrderService, private router: Router) {
    this.result = [];
    this.requests = [];
    this.carts = [];
    this.data = [];
  }
  form = new FormGroup({
    request: new FormControl('', Validators.required)
  });
  get f() {
    return this.form.controls;
  }


  changeShow(e: any) {
    console.log(e.target.value);
    if (e.target.value === "myrequest") {
      this._requestsvc.getAllRequest(this.empid).subscribe((res) => {
        if (res) {
          Date.parse(res.date)
          this.result = res;
          console.log(res);
          this.result?.reverse();
          this.requests = this.result;
          this.request = true;
        }
      })
    }
    if (e.target.value === "allrequests") {
      this._requestsvc.getAllRequests(this.empid).subscribe((res) => {
        if (res) {
          Date.parse(res.date)
          this.result = res;
          console.log(res);
          this.result?.reverse();
          this.requests = this.result;
          this.request = true;
        }
      })
    }

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
        Date.parse(res.date)
        this.result = res;
        console.log(res);
        this.result?.reverse();
        this.requests = this.result;
        this.request = true;
      }
    })

  }
  onRemove(id: number) {
    this._cartsvc.remove(id).subscribe((res) => {
      if (res) {
        window.location.reload();
      }
    })
  }
  onDeleteRequest(reqid: number) {
    this._requestsvc.deleteRequest(reqid).subscribe((res) => {
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
