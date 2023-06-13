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
constructor(public fb : FormBuilder,private svc:MaterialService, private router:Router){
this.order={
  "employeeid" :0,
  "materialid":0,
  "type":'',
  "quantity":0
};
}


orderForm = this.fb.group({
  id : [0 , [Validators.required]],
  name : [ ' ', [Validators.required]],
  type : [ ' ', [Validators.required]],
  quantity : [ 0, [Validators.required]],
  orderQuantity: [ 0, [Validators.required]],
});

ngOnInit(): void {
  this.subscription = this.svc.getData().subscribe((response) =>{
    console.log(response.data);
    console.log(response);
    this.material=response.data
  })
}
onSubmit(){
  if(this.orderForm.value!==undefined){
    this.order.materialid=this.orderForm.value.id;
    this.order.quantity=this.orderForm.value.orderQuantity;
    this.order.employeeid=this.empid;
    this.order.type=this.orderForm.value.type;
    console.log(this.order);
    this.svc.Order(this.order).subscribe((res)=>{
      if(res){
        alert("Ordered Successfully!");
        this.router.navigate(['']);
      }
    })
  }


}
}
