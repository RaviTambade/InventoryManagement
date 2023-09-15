import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/Models/Material';
import { Request } from 'src/app/Models/Request';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent implements OnInit{
  material:Material |undefined;
  request = new Request(
    '',
    456, 
    '', 
    0 
  ); 
  add:boolean=false;
  constructor(private materialSvc:MaterialService , private _initialReqSvc: InitialRequestService){
  }

  ngOnInit(): void {
    this.getMaterialId()
 
  }

  getMaterialId(){
    this.materialSvc.selectedMaterialId$.subscribe((res)=>{
      console.log(res);
      const materialid=res;
      if(materialid ==0 || materialid==null){
        this.material=undefined;
      }
      if(materialid!=null )
      this.getMaterialDetails(res);
    })
  }

  getMaterialDetails(materialid:any){
    this.materialSvc.getMaterial(materialid).subscribe((response)=>{
      this.material=response;
      console.log(this.material);
    })
  }
  addNew(){
    this.add=true;
  }
  onCancel(){
    this.add=false;
  }
 
    onAdd(name: string, category: any, quantity: number) {

      this.request.employeeId = 11;
      this.request.name = name;
      this.request.category = category,
      this.request.quantity = quantity
      console.log(this.request)
      this._initialReqSvc.add(this.request).subscribe((res) => {
        console.log(res);
        if (res) {
          alert("added to cart!");
        }
      })
      this.add=false;  
  }
}
