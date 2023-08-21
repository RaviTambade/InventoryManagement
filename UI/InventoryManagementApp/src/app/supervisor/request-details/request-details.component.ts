import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { MaterialService } from 'src/app/Services/material.service';
import { OrderService } from 'src/app/Services/order.service';
import { RequestService } from 'src/app/Services/request.service';

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
  orderDetail: any;
  dateTime: string = '';
  date: any;
  subscription: Subscription | undefined;

  constructor(private _requestsvc:RequestService, private _ordersvc: OrderService, private router: Router, private _Activatedroute: ActivatedRoute) {
    this.carts=[];

  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('requestid');
      this.reqid = Number.parseInt(this.id);
      console.log(this.id);
    });

    this._requestsvc.getRequestDetails(this.reqid,).subscribe((res) => {
      this.carts = res;
      console.log(this.carts);
      this.getData();

    })
  }

  onRemove(id: number) {
    this._requestsvc.removeItem(id).subscribe((res) => {
      console.log(res);
      window.location.reload();

    })
  }

  getData(){
    this.orderDetail = this.carts[0];
      this.dateTime = this.orderDetail.date;
      this.date = this.dateTime.split('T');
      console.log(this.orderDetail)

  }

  onEdit(id: number) {
    this.router.navigate(["/supervisor/editRequest", id])
  }
}
