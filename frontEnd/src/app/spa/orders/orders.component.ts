import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  subscription: Subscription|undefined;
  material:any;
  order:any;
  empid=12;
  cart:any[];
constructor(public fb : FormBuilder,private svc:MaterialService, private router:Router){
this.order={
  "employeeid" :0,
  "materialid":0,
  "category":'',
  "quantity":0
};
this.cart=[];
}


orderForm = this.fb.group({
  id : [0 , [Validators.required]],
  name : [ ' ', [Validators.required]],
  type : [ ' ', [Validators.required]],
  quantity : [ 0, [Validators.required]],
  orderQuantity: [ 0, [Validators.required]],
});

ngOnInit(): void {
    this.subscription= this.svc.getData().subscribe((response) =>{
    console.log(response.data);
    this.material=response.data;
  })
}
onSubmit(){
  if(this.orderForm.value!==undefined){
    this.order.materialid=this.orderForm.value.id;
    this.order.quantity=this.orderForm.value.orderQuantity;
    this.order.employeeid=this.empid;
    this.order.category=this.orderForm.value.type;

    this.svc.addToCart(this.order).subscribe((res)=>{
      console.log(res);
      if(res){
        alert("added to cart!");
        this.router.navigate(['store']);
      }
    })
  }

}
}
