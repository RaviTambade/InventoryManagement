import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orders:any[];
  public constructor(private svc:OrderService,private router:Router){
    this.orders=[];
  }
  ngOnInit(){
    this.svc.orderHistory(1).subscribe((res)=>{
      console.log(res);
      this.orders=res;
    })
  }
  onView(orderId:number){
    this.router.navigate(['orderdetails', orderId]);

  }
}
