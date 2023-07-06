import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  isDisabledPrev = false;
  isDisabledNext = false;
  currentIndex = 0;
  endIndex = 0;
  arrLength = 0;
  selectedItems: any[] | undefined;
  data: any[];
  size: number = 0;

  constructor(private svc: AppService) {
    this.data = []

  }

  ngOnInit(): void {
    this.svc.getMaterialInfo().subscribe((response) => {
      this.data = response;
      console.log(this.data)
      this.arrLength = this.data.length;
      this.size = 5;
      this.currentIndex = 0;
      this.endIndex = this.currentIndex + this.size;
      this.selectedItems = this.data.slice(this.currentIndex, this.endIndex);

    })
    this.isDisabledPrev = true;

  }

  next() {
    this.currentIndex = this.currentIndex + this.size;
    this.endIndex = this.currentIndex + this.size;
    this.selectedItems = this.data.slice(this.currentIndex, this.endIndex);
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
    this.selectedItems = this.data.slice(this.currentIndex, this.endIndex);
    //button unable disable code
    this.isDisabledNext = false;
    if (this.currentIndex <= 0) 
    {
      this.isDisabledPrev = true;
    }


  }
}



