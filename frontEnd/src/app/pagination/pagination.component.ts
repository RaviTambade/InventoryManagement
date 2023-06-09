import { Component } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  items = ["abhay", "rohit", "pragati", "akash", "akshay", "rishikesh","rahul", "vedant","sumit","shankar","kalpehsh","siddhant"];  
  gridItems =this.items.slice(0,5);
  currentIndex=0;
  endIndex=0;
 arrLength=0;
 constructor(){
  this.arrLength=this.items.length
 }
 next(){
  console.log("next is clicked");
  this.gridItems=[];
  if(this.currentIndex<this.arrLength){
    this.currentIndex =this.currentIndex+5;
    this.endIndex = this.currentIndex+5;
  }
  this.gridItems =this.items.slice(this.currentIndex, this.endIndex);
 }
 previous(){
  console.log("privious is clicked");
  this.gridItems=[];
  console.log(this.currentIndex)
  if(this.currentIndex < this.arrLength){
    this.currentIndex =this.currentIndex -5;
    this.endIndex = this.currentIndex+5;
  }
  this.gridItems =this.items.slice(this.currentIndex, this.endIndex);
 }
}



