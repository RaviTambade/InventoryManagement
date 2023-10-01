import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateWarehouse } from '../Models/updateWarehouse';
// import { warehouseStaff } from './WarehouseStaff';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  getAllWarehouseStaff(): Observable<any> {
    let url = "http://localhost:5131/api/warehouse/warehouses";
    return this.http.get(url);
  }
  getAllStoreMangers(): Observable<any> {
    let url = "http://localhost:5131/api/warehouse/storemanagers";
    return this.http.get(url);
  }
  getWarehouseStaff(id: number): Observable<any> {
    let url = "http://localhost:5131/api/warehouse/warehouse/" + id;
    return this.http.get(url);
  }
  updateWarehouseStaff(warehouseStaff: UpdateWarehouse): Observable<any> {
    let url = "http://localhost:5131/api/warehouse/warehouse" ;
    return this.http.put(url,warehouseStaff);
  }
}
