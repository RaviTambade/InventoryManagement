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
  

  constructor(private svc: MaterialService,private router:Router) { 
    this.result=[];
    this.requests=[];
    this.carts=[];
    this.data=[];
  }

  ngOnInit(): void {
    this.svc.getCarts(this.empid).subscribe((res) => {
      this.data = res;
      console.log(res);
      this.data?.reverse();
      this.carts=this.data;
    })

    this.svc.getRequests(this.empid).subscribe((res) => {
      this.result = res;
      console.log(res);
      this.result?.reverse();
      this.requests=this.result;
    })

  }
  onRemove(cartid:number){

  }

  onOrder(){
    this.svc.order(this.empid).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['store']);
    })
  }
  onRemoveAll(){  
    this.svc.removeAll(this.empid).subscribe((res)=>{
      console.log(res);
    })
  }

  onEdit(cartid:number){
    this.router.navigate(['editcart', cartid]);

  }


  onView(requestid:number){
    this.router.navigate(['requestDetails', requestid]);

  }
}
