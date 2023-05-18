import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialTestService {

  constructor() { }
  //target
  private subject = new Subject<any>();

  materials = [
    { name: 'Bearings', id: '1', materialType: 'ball bearing', quantity: 54, unitPrice: 20, empId: 1 },
    { name: 'Housing', id: '2', materialType: 'Front Half', quantity: 754, unitPrice: 74, empId: 1 },
    { name: 'Top Cover', id: '3', materialType: '30% top cover', quantity: 74, unitPrice: 400, empId: 1 },
    { name: 'Main Shaft', id: '3', materialType: '400 main shaft', quantity: 88, unitPrice: 208, empId: 1 },

  ];

  sendData(data: any) {
    //this.subject.next(data);
    //it is publishing this value to all subscriber
    //that have already subscribed to this message
    data = data.MaterialName;
    switch (data) {
      case "Bearings":
        {
          let materials = this.materials.filter(material => material.name == "Bearings");
          this.subject.next(materials);
          console.log(materials);
        } break;

      case "Housing":
        {
          let materials = this.materials.filter(material => material.name == "Housing");
          this.subject.next(materials);
          console.log(materials);
        } break;

      case "Top Cover":
        {
          let materials = this.materials.filter(material => material.name == "Top Cover");
          this.subject.next(materials);
          console.log(materials);
        } break;

      case "Main Shaft":
        {
          let materials = this.materials.filter(material => material.name == "Main Shaft");
          this.subject.next(materials);
          console.log(materials);
        } break;


      default: break;

    }

  }

  clearData() {
    this.subject.next(" ");
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
