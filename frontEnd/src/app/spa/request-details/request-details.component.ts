import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { OrdersComponent } from '../orders/orders.component';
import { OrderService } from '../order.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  carts: any[];
  id: any;
  img: any;
  reqid: number = 0;
  materialid: number = 0;
  subscription: Subscription | undefined;

  constructor(private _cartsvc: CartService, private _materialsvc: MaterialService,private _requestsvc:RequestService, private _ordersvc: OrderService, private router: Router, private _Activatedroute: ActivatedRoute) {
    this.carts=[];

  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('requestid');
      this.reqid = Number.parseInt(this.id);
      console.log(this.id);
    });

    this._requestsvc.getRequestDetails(this.reqid).subscribe((res) => {
      this.carts = res;
      console.log(this.carts);
    })
  }

  onRemove(orderid: number) {
    this._ordersvc.removeCartFromRequest(orderid).subscribe((res) => {
      console.log(res);
      window.location.reload();

    })
  }
  onEdit(orderid: number) {
    this.router.navigate(["editRequest", orderid])
  }
}
