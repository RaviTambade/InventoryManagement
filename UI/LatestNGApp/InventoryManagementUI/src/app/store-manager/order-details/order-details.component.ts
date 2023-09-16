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
  department:string='';
  orderDate=new Date()
  inprogressOrder:boolean=false;
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
       this.newDetails=true;

    this.department=this.orderDetails[0].department;
    this.orderDate=this.orderDetails[0].orderDate;

    if(this.orderDetails[0].status=='inprogress'){
      this.inprogressOrder=true;
    }
    else
    this.inprogressOrder=false;

  })
}

onApproved(orderid: any, q: any) {
  const quantity = Number.parseInt(q)
  console.log(quantity);
  console.log(orderid)
  this.orderService.Approve(orderid, quantity).subscribe((res) => {
    console.log(res);
    window.location.reload();

  })

}

}
