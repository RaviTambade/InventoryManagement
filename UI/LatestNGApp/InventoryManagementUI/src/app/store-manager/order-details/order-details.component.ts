import { Component, OnInit } from '@angular/core';
import { OrderDetails } from 'src/app/Models/orderDetails';
import { OrderService } from 'src/app/Services/order.service';
import { UserService } from 'src/app/Services/user.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderDetails:OrderDetails[]=[];
  orderId:number=0;
  storeManagerId:number=1;
  newDetails:boolean=false;
  department:string='';
  orderDate=new Date()
  inprogressOrder:boolean=false;
  shipper:any={
    id:0,
    name:""
  };
  isApprove: boolean=false;
  isShipper:boolean=false;

  constructor(private cdr: ChangeDetectorRef,private orderService:OrderService,private _usersvc:UserService){}

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
       this.getUser();

    this.department=this.orderDetails[0].department;
    this.orderDate=this.orderDetails[0].orderDate;

    if(this.orderDetails[0].status=='inprogress'){
      this.inprogressOrder=true;
    }
    else
    this.inprogressOrder=false;
  })
}

getUser() {
  const shipperId=this.orderDetails[0].shipperId;
  console.log(shipperId);
  this._usersvc.getUser(shipperId).subscribe((res)=>{
    console.log(res);
    this.shipper=res;
    console.log(this.shipper);
    this.isShipper=true;
  })
 }


onApproved(orderid: any, q: any) {
  const quantity = Number.parseInt(q)
  console.log(quantity);
  console.log(orderid)
  this.orderService.Approve(orderid, quantity).subscribe((res) => {
    console.log(res);
    if(res==true){
      this.cdr.detectChanges();    }
  })

}

}
