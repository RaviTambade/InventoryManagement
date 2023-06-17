import { Component } from '@angular/core';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orders:any[];
  public constructor(private svc:MaterialService){
    this.orders=[];
  }
  ngOnInit(){
    this.svc.orderHistory(12).subscribe((res)=>{
      console.log(res);
      this.orders=res;
    })
  }
}
