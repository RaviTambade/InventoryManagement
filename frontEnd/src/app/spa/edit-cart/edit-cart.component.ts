import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { ActivatedRoute, Router,  } from '@angular/router';

@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.css']
})
export class EditCartComponent {
  material:any;
  empid=12;
  id:any;
  cartId:number=0;
  updateQuantity:any;
constructor(private svc:MaterialService, private router:Router,private _Activatedroute:ActivatedRoute){
  this.updateQuantity={
    id:0,
    quantity:0
  }
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
