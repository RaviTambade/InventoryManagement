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
  subscription: Subscription|undefined;

  constructor(private svc: MaterialService,private router:Router) { 
    this.result=[];
    this.requests=[];
    this.carts=[];
    this.data=[];
  }

  ngOnInit(): void {
    this.svc.getCart(12).subscribe((res) => {
      this.data = res;
      console.log(res);
      this.data?.reverse();
      this.carts=this.data;
    })

    this.svc.getRequests(12).subscribe((res) => {
      this.result = res;
      console.log(res);
      this.result?.reverse();
      this.requests=this.result;
    })

  }
  onRemove(id:number){
    this.svc.remove(id).subscribe((res)=>{
      console.log(res);  
    })
  }

  onOrder(){
    this.svc.order(12).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['store']);
    })
  }
  onRemoveAll(){  
    console.log("removeAll");
  }

  onView(requestid:number){
    // this.svc.getRequestDetails(requestid);
    this.router.navigate(['requestDetails', requestid]);

  }
}
