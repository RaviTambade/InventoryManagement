import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

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

  constructor(private svc: AppService) {
    this.data = []

  }

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

}
