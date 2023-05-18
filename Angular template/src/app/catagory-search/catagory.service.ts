import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  constructor(private http: HttpClient) { }
  //target
  private subject = new Subject<any>();

  // materials = [
  //   { name: 'Bearings', id: '1', materialType: 'ball bearing', quantity: 54, unitPrice: 20, empId: 1 },
  //   { name: 'Housing', id: '2', materialType: 'Front Half', quantity: 754, unitPrice: 74, empId: 1 },
  //   { name: 'Top Cover', id: '3', materialType: '30% top cover', quantity: 74, unitPrice: 400, empId: 1 },
  //   { name: 'Main Shaft', id: '3', materialType: '400 main shaft', quantity: 88, unitPrice: 208, empId: 1 },

  // ];

  sendData(data: any) {
    let url ="http://localhost:5176/api/Materials/getmaterialByCatagory/";
    return this.http.get<any>(url, data);
  }

  clearData() {
    this.subject.next(" ");
  }

  getData(): Observable<any> {
    return this.subject.asObservable();
  }
}
