import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MaterialService } from '../material.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  orders: any[] ;
  result:any[];
  isDisabledPrev = false;
  isDisabledNext = false;
  currentIndex = 0;
  size: number = 0;
  endIndex = 0;
  arrLength = 0;
  subscription: Subscription|undefined;

  constructor(private svc: MaterialService,private router:Router) { 
    this.result=[];
    this.orders=[];
  }

  ngOnInit(): void {
    this.subscription =this.svc.getOrdersHistory(12).subscribe((res) => {
      this.result = res;
      console.log(res);
      this.result?.reverse();
      this.orders=this.result;
      this.arrLength = this.result.length;
      this.size = 4;
      this.currentIndex = 0;
      this.endIndex = this.currentIndex + this.size;
      this.orders = this.result.slice(this.currentIndex, this.endIndex);
    })
    this.isDisabledPrev = true;
  }
  next() {
    this.currentIndex = this.currentIndex + this.size;
    this.endIndex = this.currentIndex + this.size;
    this.orders = this.result.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledPrev = false;
    if (this.endIndex >= this.arrLength)
    {
      this.isDisabledNext = true;
    }
  }

  previous() {
    this.currentIndex = this.currentIndex - this.size;
    this.endIndex = this.currentIndex + this.size;
    this.orders = this.result.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledNext = false;
    if (this.currentIndex <= 0) 
    {
      this.isDisabledPrev = true;
    }
  }
  details(id:number){
       console.log(id);
       this.svc.getOrderDetails(id);
        this.router.navigate(['orderdetails'])
     
  }

  
}
