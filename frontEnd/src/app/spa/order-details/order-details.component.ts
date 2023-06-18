import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Subscription, VirtualTimeScheduler } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  result:any;
  orderId:number=0;
  orderDetail:any;
  public constructor(private svc:OrderService,private activeRoute:ActivatedRoute){}
  ngOnInit(){
    this.activeRoute.paramMap.subscribe((param)=>{
      this.result=param.get('orderId')
      this.orderId=Number.parseInt(this.result)
      console.log(this.orderId)
    })
    this.svc.orderDetails(this.orderId).subscribe((res)=>{
      console.log(res);
    })
  }
}
