import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-edit-initial-request',
  templateUrl: './edit-initial-request.component.html',
  styleUrls: ['./edit-initial-request.component.css']
})
export class EditInitialRequestComponent {

  material:any;
  empid=12;
  id:any;
  img:any;
  cartId:number=0;
  updateQuantity:any;
constructor(private svc:InitialRequestService, private materialsvc:MaterialService, private router:Router,private _Activatedroute:ActivatedRoute){
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
    this.id=params.get('cartId');
    this.cartId=Number.parseInt(this.id);
    console.log(this.cartId);
  });
  this.svc.getCart(this.cartId).subscribe((res)=>{
    console.log(res);
    this.material=res;
    this.getImg(this.material.materialId);
  });

}
getImg(id:any){
  console.log(id);
  this.materialsvc.getMaterial(id).subscribe((res)=>{
    console.log(res);
    this.img=res;
    console.log(this.img);   
  })

}

editQuantity(id:any,quantity:any){
  this.updateQuantity.id=id;
  this.updateQuantity.quantity=quantity;
  console.log(this.updateQuantity);
  this.svc.updateQuantity(this.updateQuantity).subscribe((res)=>{
    if(res){
      this.router.navigate(["requestHistory"])
    }
  })
  
}
}
