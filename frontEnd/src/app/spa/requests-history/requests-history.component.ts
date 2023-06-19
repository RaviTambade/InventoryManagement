import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-requests-history',
  templateUrl: './requests-history.component.html',
  styleUrls: ['./requests-history.component.css']
})
export class RequestsHistoryComponent {
  requests: any[] ;
  result:any[];
  carts: any[] ;
  data:any[];
  empid:number=12;
  cart:boolean |undefined;
  emptycart:boolean |undefined;

  request:boolean |undefined;
  

  constructor(private svc: MaterialService,private router:Router) { 
    this.result=[];
    this.requests=[];
    this.carts=[];
    this.data=[];
  }

  ngOnInit(): void {
    this.svc.getCarts(this.empid).subscribe((res) => {
      console.log(res);
        this.data = res;
        if(this.data.length==0){
          this.emptycart=true
        }
        else{
          this.cart=true;
          this.data?.reverse();
          this.carts=this.data;
        }
 
    })

    this.svc.getRequests(this.empid).subscribe((res) => {
      if(res){
        Date.parse(res.date)
        this.result = res;
        console.log(res);
        this.result?.reverse();
        this.requests=this.result;
        this.request=true;
      }
    })

  }
  onRemove(id:number){
    this.svc.remove(id).subscribe((res)=>{
      if(res){
        window.location.reload();
      }
    })
  }
  onDeleteRequest(reqid:number){
    this.svc.deleteRequest(reqid).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    })
  }

  onOrder(){
    this.svc.order(this.empid).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    })
  }
  onRemoveAll(){  
    this.svc.removeAll(this.empid).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    })
  }

  onEdit(cartid:number){
    this.router.navigate(['editcart', cartid]);

  }


  onView(requestid:number){
    this.router.navigate(['requestDetails', requestid]);

  }
}
