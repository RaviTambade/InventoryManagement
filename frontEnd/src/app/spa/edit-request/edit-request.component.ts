import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent {
  material:any;
  empid=12;
  id:any;
  img:any;
  orderId:number=0;
  updateQuantity:any;
constructor(private _cartsvc:CartService,private _materialsvc:MaterialService, private router:Router,private _Activatedroute:ActivatedRoute){
  this.updateQuantity={
    id:0,
    quantity:0
  }
  this.material = {
    "id": 0,
    "cartId": 0,
    "category": '',
    "employeeId": 0,
    "materialId": 0,
    "quantity": 0,
  };
}

ngOnInit(): void {
  this._Activatedroute.paramMap.subscribe((params) =>
  {
    this.id=params.get('orderId');
    this.orderId=Number.parseInt(this.id);
    console.log(this.orderId);
  });
  this._cartsvc.getCartFromRequest(this.orderId).subscribe((res)=>{
    console.log(res);
    this.material=res;
    this.getImg(this.material.materialId);
  });

}
getImg(id:any){
  console.log(id);
  this._materialsvc.getMaterial(id).subscribe((res)=>{
    console.log(res);
    this.img=res;
    console.log(this.img);   
  })

}

editQuantity(id:any,quantity:any){
  this.updateQuantity.id=id;
  this.updateQuantity.quantity=quantity;
  console.log(this.updateQuantity);
  this._cartsvc.updateQuantityOfCartFromRequest(this.updateQuantity).subscribe((res)=>{
    console.log(res);
    if(res){
      this.router.navigate(["requestHistory"])
    }
  })
  
}

}
