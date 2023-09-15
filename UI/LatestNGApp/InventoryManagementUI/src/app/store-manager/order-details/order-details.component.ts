import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/Models/orderDetails';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails:OrderDetails |any;
  orderId:number=0;
  storeManagerId:number=1;
  newDetails:boolean=false;

  constructor(private orderService:OrderService){}
  ngOnInit(): void {
    this.orderService.selectedOrderId$.subscribe((id) => {
      console.log(id)
      this.orderId=id;
      if(id==0 || id==null){
        this.orderDetails=[];
        this.newDetails=false;
      }
      else
    this.getOrderDetails();
  })
  }

 getOrderDetails(){
  this.orderService.getOrderDetails(this.orderId).subscribe((res) => {
    console.log(res);
    this.orderDetails = res;
    this.newDetails=true
  })
}

}
