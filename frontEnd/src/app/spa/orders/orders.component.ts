import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  material:any;
  order:any;
  empid=11;
  cart:any[];
  orderqunatity:number=0;
  id:any;
  materialId:number=0;
constructor(private _materialsvc:MaterialService, private _cartsvc:CartService, private router:Router,private _Activatedroute:ActivatedRoute){
this.order={
  "employeeid" :0,
  "materialid":0,
  "category":'',
  "quantity":0
};
this.cart=[];
}

ngOnInit(): void {
  this._Activatedroute.paramMap.subscribe((params) =>
  {
    this.id=params.get('id');
    this.materialId=Number.parseInt(this.id);
    console.log(this.materialId);
  });
  this._materialsvc.getById(this.materialId).subscribe((res)=>{
    console.log(res);
    this.material=res;
  })


}
onOrder(materialid:number,category:any,quantity:number){

console.log(this.empid,materialid,category,quantity)
this.order.employeeid=this.empid;
this.order.materialid=materialid;
this.order.category=category,
this.order.quantity=quantity
    this._cartsvc.addToCart(this.order).subscribe((res)=>{
      console.log(res);
      if(res){
        alert("added to cart!");
        this.router.navigate(['store']);
      }
    })
  }

}

