import { Component, Input, OnInit } from '@angular/core';
import { quantity } from 'chartist';
import { response } from 'express';
import { Material } from '../Material';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-material-update-form',
  templateUrl: './material-update-form.component.html',
  styleUrls: ['./material-update-form.component.scss']
})
export class MaterialUpdateFormComponent implements OnInit {

  @Input() materialId: number | undefined;
  material: Material | undefined;
  status: boolean | undefined;
  Material={
    "materialId":1,
    "materialName":'',
    "materialType":'',
    "materialQuantity":0,
    "unitprice":0,
    "materialImgUrl":'',
 };
  constructor(private svc: MaterialService ) { }
  
  ngOnInit(): void {
    if (this.materialId != undefined) {
      this.svc.getById(this.materialId).subscribe((response) => {
        console.log(response);
      })
    }
  }
  getMaterialById(id: any) {
    this.svc.getById(id).subscribe((response) => {
      this.material = response;
      console.log(this.material);
    })
  }
  
  update() {
    this.material.materialQuantity = this.material.materialQuantity + this.material.updateQuantity;
      this.svc.update(this.material).subscribe((response)=>{
        this.status = response;
        console.log(response);
      })
  
    }
}

