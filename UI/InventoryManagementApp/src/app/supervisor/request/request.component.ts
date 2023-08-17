import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {
  material: any;
  order: any;
  empid = 11;
  cart: any[];
  orderqunatity: number = 0;
  id: any;
  materialId: number = 0;
  constructor(private _materialsvc: MaterialService, private _cartsvc: InitialRequestService, private router: Router, private _Activatedroute: ActivatedRoute) {
    this.order = {
      "employeeid": 0,
      "materialid": 0,
      "category": '',
      "quantity": 0
    };
    this.cart = [];
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.materialId = Number.parseInt(this.id);
      console.log(this.materialId);
    });
    this._materialsvc.getById(this.materialId).subscribe((res) => {
      console.log(res);
      this.material = res;
    })


  }
  onOrder(materialid: number, category: any, quantity: number) {

    this.order.employeeid = this.empid;
    this.order.materialid = materialid;
    this.order.category = category,
      this.order.quantity = quantity
    console.log(this.order)
    this._cartsvc.addToCart(this.order).subscribe((res) => {
      console.log(res);
      if (res) {
        alert("added to cart!");
        this.router.navigate(['store']);
      }
    })
  }

}
