import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestDetails } from 'src/app/supervisor/Models/RequestDetails';
import { MaterialService } from 'src/app/Services/material.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-edit-request',
  templateUrl: './edit-request.component.html',
  styleUrls: ['./edit-request.component.css']
})
export class EditRequestComponent {
  material:any;
  empid=12;
  id:any;
  img:any;
  requestId:number=0;
  item:RequestDetails ;
constructor(private _materialsvc:MaterialService,private _requestsvc:RequestService, private router:Router,private _Activatedroute:ActivatedRoute){
  this.item = {
    "id": 0,
    "date":new Date(),
    "category": '',
    "materialId": 0,
    "quantity": 0,
    "status":''
  };
  this.material = {
    "id": 0,
    "cartId": 0,
    "category": '',
    "employeeId": 0,
    "materialId": 0,
    "quantity": 0,
  };
}

ngOnInit(): void {
  this._Activatedroute.paramMap.subscribe((params) =>
  {
    this.id=params.get('id');
    this.requestId=Number.parseInt(this.id);
    console.log(this.requestId);
  });
  this._requestsvc.getItemFromRequest(this.requestId).subscribe((res)=>{
    console.log(res);
    this.material=res;
    this.getImg(this.material.materialId);
  });

}
getImg(id:any){
  console.log(id);
  this._materialsvc.getMaterial(id).subscribe((res)=>{
    console.log(res);
    this.img=res;
    console.log(this.img);   
  })

}

editQuantity(id:any,quantity:any){
  this.item.id=id;
  this.item.quantity=quantity;
  console.log(this.item);
  this._requestsvc.updateRequestedItem(this.item).subscribe((res)=>{
    console.log(res);
    if(res){
      this.router.navigate(["requestHistory"])
    }
  })
  
}

}
