import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  subscription: Subscription|undefined;
  material:any;
constructor(public fb : FormBuilder,private svc:MaterialService){}



orderForm = this.fb.group({
  id : [ ' ', [Validators.required]],
  name : [ ' ', [Validators.required]],
  type : [ ' ', [Validators.required]],
  quantity : [ ' ', [Validators.required]],
  orderQuantity: [ ' ', [Validators.required]],
});

ngOnInit(): void {
  this.subscription = this.svc.getData().subscribe((response) =>{
    console.log(response.data);
    console.log(response);
    this.material=response.data
  })
}
onSubmit(){
  console.log(this.orderForm.value);
    // this.isSubmitted= true;
    // if(!this.registrationForm.valid){
    //   false;
    // }
    // else{
    //   console.log("onSubmit");           
    //   console.log(JSON.stringify(this.registrationForm.value));
    //     }
}
}
