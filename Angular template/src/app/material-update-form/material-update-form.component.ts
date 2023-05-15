import { Component, Input, OnInit } from '@angular/core';
import { Material } from 'app/Material';
import { MaterialService } from 'app/material.service';
import { quantity } from 'chartist';
import { response } from 'express';

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

  // onUpdte(materialId:number, quantity:any){
  //   console.log(materialId);
  //   console.log(quantity)
  //   this.svc.updateQuantity(materialId,quantity).subscribe((response)=>{
  //     this.status= response;
  //     console.log(response);
  //   })
  // }

  // Update(_UpdateForm:any){
  //   this.svc.update(this.Material).subscribe((Response)=>{
  //     this.status=Response;
  //     console.log(Response);
  //   })


  
  update() {
    this.material.materialQuantity = this.material.materialQuantity + this.material.updateQuantity;
      this.svc.update(this.material).subscribe((response)=>{
        this.status = response;
        console.log(response);
      })
  
    }
}

