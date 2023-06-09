import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  currentIndex = 0;
  endIndex = 0;
  arrLength = 0;
  selectedItems:any[] |undefined;
  data:any[] ;
  size:number=0;
  constructor(private svc: AppService) {
    this.data=[]
    }

  ngOnInit(): void {
    this.svc.getMaterialInfo().subscribe((response) => {
      this.data =response;
      console.log(this.data)
      this.size=5;
      this.currentIndex=0;
      this.endIndex=this.currentIndex+this.size;
      this.selectedItems=this.data.slice(this.currentIndex,this.endIndex);
    })
 
  }

   next() {
    console.log("next is clicked");
    this.currentIndex=this.currentIndex+this.size;
    this.endIndex=this.currentIndex+this.size;
    this.selectedItems=this.data.slice(this.currentIndex,this.endIndex);
  
  }
  previous() {
    this.currentIndex=this.currentIndex-this.size;
    this.endIndex=this.currentIndex+this.size;
    this.selectedItems=this.data.slice(this.currentIndex,this.endIndex);
  }
}



