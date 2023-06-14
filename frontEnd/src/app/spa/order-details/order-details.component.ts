import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  subscription: Subscription|undefined;

  orderDetail:any;
  public constructor(private svc:MaterialService){
    
  }
  ngOnInit(){
    this.subscription=this.svc.GetDetails().subscribe((res)=>{
      console.log(res);
      this.orderDetail=res.data;
    })
  }
}
