import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from 'app/Material';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private http: HttpClient) { }
  //target
  private subject = new Subject<any>();

  sendData(data:any){
    let material = data.MaterialName;
    console.log("Service is called");
    console.log(material);

    switch(material){
      case "Bearing":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;
      }
      case "2nd Gear":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;
      }
      case "1st Gear":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;  
      }
      case "3rd Gear":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;  
      }
      case "Reverse Gear":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;  
      }
      case "Housing":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;  
      }
      case "Main Shaft":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;  
      }
      case "Counter Shaft":{
        let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/"+ material;
        this.http.get(url).subscribe((data) =>{
          console.log(data);
          this.subject.next({data,material});
        });
        break;  
      }
    }

  }

  clearData() {
    this.subject.next(" ");
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
