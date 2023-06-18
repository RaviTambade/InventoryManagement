import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MaterialService } from '../material.service';
import { Route, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { CartService } from '../cart.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  isDisabledPrev = false;
  isDisabledNext = false;
  currentIndex = 0;
  endIndex = 0;
  arrLength = 0;
  materials: any[] | undefined;
  data: any[];
  size: number = 0;
  material:any;
  cart:any[];
  newOrder:any;
  status:boolean=false;

  constructor( private fb: FormBuilder,private svc: MaterialService, private router:Router, private cartsvc:CartService) {
    this.data = [];
    this.cart=[];
    this.newOrder={"employeeid" :0,
    "materialid":0,
    "type":'',
    "quantity":0};
  }
  orderForm = this.fb.group({
    id : [0 , [Validators.required]],
    name : [ ' ', [Validators.required]],
    type : [ ' ', [Validators.required]],
    quantity : [ 0, [Validators.required]],
    orderQuantity: [ 0, [Validators.required]],
  });

  ngOnInit(): void {
    this.svc.getAllMaterials().subscribe((response)=>{
      this.data =response;
      console.log(response);
      this.arrLength = this.data.length;
      this.size = 3;
      this.currentIndex = 0;
      this.endIndex = this.currentIndex + this.size;
      this.materials = this.data.slice(this.currentIndex, this.endIndex);
    })
    
    this.isDisabledPrev = true;
  }
  
  next() {
    this.currentIndex = this.currentIndex + this.size;
    this.endIndex = this.currentIndex + this.size;
    this.materials = this.data.slice(this.currentIndex, this.endIndex);
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
    this.materials = this.data.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledNext = false;
    if (this.currentIndex <= 0) 
    {
      this.isDisabledPrev = true;
    }
  }

  add(id:number){
    this.router.navigate(['order', id]);
  }

    

}
