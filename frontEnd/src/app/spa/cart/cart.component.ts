import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  carts: any[] ;
  result:any[];
  subscription: Subscription|undefined;

  constructor(private svc: MaterialService,private router:Router) { 
    this.result=[];
    this.carts=[];
  }

  ngOnInit(): void {
    this.svc.getRequests(12).subscribe((res) => {
      this.result = res;
      console.log(res);
      this.result?.reverse();
      this.carts=this.result;
    })

  }
  onRemove(id:number){
    this.svc.remove(id).subscribe((res)=>{
      console.log(res);  
    })
    console.log("remove");
  }

  onOrder(){
    console.log(this.carts);
    this.svc.order(this.carts).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['requests']);
    })
  }
  onRemoveAll(){
    console.log("removeAll");

  }


}
