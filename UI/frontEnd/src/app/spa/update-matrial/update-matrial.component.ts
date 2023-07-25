import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from '../material.service';
import {Location} from '@angular/common';
@Component({
  selector: 'app-update-matrial',
  templateUrl: './update-matrial.component.html',
  styleUrls: ['./update-matrial.component.css']
})
export class UpdateMatrialComponent {
  material: any;
  order: any;
  orderqunatity: number = 0;
  id: any;
  materialId: number = 0;
  constructor(public _location:Location,private _materialsvc: MaterialService, private router: Router, private _Activatedroute: ActivatedRoute) {
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

  onUpdate(quantity: number) {
    console.log(this.materialId)
    console.log(quantity);
    this._materialsvc.updateQuantity(this.materialId,quantity).subscribe((res)=>{
      console.log(res);
    })
    this._location.back();
  }

}
