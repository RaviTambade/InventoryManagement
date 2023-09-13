import { Component, OnInit } from '@angular/core';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit{

  empid:number=11;
  trays:any[]=[];
  updatedTray:any;
  trayId:number |undefined;
  onEditClick:boolean=false;
  constructor(private requestSvc:InitialRequestService,private orderSvc:OrderService,private svc:InitialRequestService){

    this.updatedTray={
      id:0,
      quantity:0
    }
  }
  
  ngOnInit(): void {
    this.requestSvc.getTray(this.empid).subscribe((res)=>{
      this.trays=res;
      console.log(res);
    })
  }

  onRemove(id: number) {
    this.requestSvc.remove(id).subscribe((res) => {
      if (res) {
        window.location.reload();
      }
    })
  }

  onOrder() {
    this.orderSvc.order(this.empid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  onRemoveAll() {
    this.requestSvc.removeAll(this.empid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  onEdit(cartid: number){
    console.log("edit");
    this.trayId=cartid;
    this.onEditClick=true;
  }

  onEditQuantity(trayId: number,quantity:number){
    this.onEditClick=false;
    this.updatedTray.id=trayId;
    this.updatedTray.quantity=quantity;
    console.log(this.updatedTray);
  this.svc.updateQuantity(this.updatedTray).subscribe((res)=>{
    console.log(res);
  })
  }

  onCancel(cartid:number){
    this.onEditClick=false;
  }
}
