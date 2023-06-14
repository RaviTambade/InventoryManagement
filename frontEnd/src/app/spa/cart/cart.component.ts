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
  isDisabledPrev = false;
  isDisabledNext = false;
  currentIndex = 0;
  size: number = 0;
  endIndex = 0;
  arrLength = 0;
  subscription: Subscription|undefined;

  constructor(private svc: MaterialService,private router:Router) { 
    this.result=[];
    this.carts=[];
  }

  ngOnInit(): void {
    this.svc.getCart(12).subscribe((res) => {
      this.result = res;
      console.log(res);
      
      this.result?.reverse();
      this.carts=this.result;
      this.arrLength = this.result.length;
      this.size = 4;
      this.currentIndex = 0;
      this.endIndex = this.currentIndex + this.size;
      this.carts = this.result.slice(this.currentIndex, this.endIndex);
    })
    this.isDisabledPrev = true;
  }
  next() {
    this.currentIndex = this.currentIndex + this.size;
    this.endIndex = this.currentIndex + this.size;
    this.carts = this.result.slice(this.currentIndex, this.endIndex);
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
    this.carts = this.result.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledNext = false;
    if (this.currentIndex <= 0) 
    {
      this.isDisabledPrev = true;
    }
  }


}
