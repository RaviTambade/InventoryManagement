import { Component } from '@angular/core';
import { Material } from 'src/app/Models/Material';
import { Request } from 'src/app/Models/Request';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.css']
})
export class MaterialDetailsComponent {

  material:Material={
    id: 0,
    name: '',
    type: '',
    quantity: 0,
    unitPrice: 0,
    imageUrl: ''
  };
  request = new Request(
    '',
    456, 
    '', 
    0 
  );
  request1:Request={
    name: '',
    employeeId: 0,
    category: '',
    quantity: 0
    
  }
  details:boolean=false;
  quantityValue: number=0; 
  isSupervisor:boolean=false;
  add:boolean=false;
  update:boolean=false;
  constructor(private materialSvc:MaterialService , private _initialReqSvc: InitialRequestService){
  }

  ngOnInit(): void {
    const role=localStorage.getItem("role");
    if(role=="Supervisor"){
       this.isSupervisor=true;
    }
    this.getMaterialId()
 
  }

  getMaterialId(){
    this.materialSvc.selectedMaterialId$.subscribe((res)=>{
      const materialid=res;
     if(materialid==0 || materialid==null){
      this.details=false;
     }
      else
      this.getMaterialDetails(res);
    })
  }

  getMaterialDetails(materialid:any){
    this.materialSvc.getMaterial(materialid).subscribe((response)=>{
      this.material=response;
      this.details=true;
    })
  }
  addNew(){
    this.add=true;
  }
  onCancel(){
    this.add=false;
  }
 
    onAdd(name: string, category: any, quantity: number) {

      this.request.employeeId = 21;
      this.request.name = name;
      this.request.category = category,
      this.request.quantity = quantity
      this._initialReqSvc.add(this.request).subscribe((res) => {
        // if (res) {
        //   alert("added to cart!");
        // }
      })
      
      this.add=false;  
  }

  onUpdate(){
this.update=true;
  }
  onCancelUpdate(){
    this.update=false;
  }
  onUpdateQuantity(id:number,quantity:number){
    this.update=false;
    const updatedQuantity=this.material?.quantity + quantity
  this.materialSvc.updateQuantity(id,updatedQuantity).subscribe((res)=>{
    this.getMaterialDetails(id);
  })
  }
}
