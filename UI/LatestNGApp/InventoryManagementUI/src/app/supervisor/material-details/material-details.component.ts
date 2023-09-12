import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/Models/Material';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit{
  material:Material |undefined; 

  constructor(private materialSvc:MaterialService){
  }

  ngOnInit(): void {
    console.log("material");
    this.materialSvc.selectedMaterialId$.subscribe((res)=>{
      console.log(res);
      const materialid=res;
      if(materialid!=null)
      this.getMaterialDetails(res);
    })
  }

  getMaterialDetails(materialid:any){
    this.materialSvc.getMaterial(materialid).subscribe((response)=>{
      this.material=response;
      console.log(this.material);
    })
  }

}
