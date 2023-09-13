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
  tray:any[]=[];
  trayId:number |undefined;
  onEditClick:boolean=false;
  constructor(private requestSvc:InitialRequestService,private orderSvc:OrderService){}
  
  ngOnInit(): void {
    this.requestSvc.getTray(this.empid).subscribe((res)=>{
      this.tray=res;
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

  // onOrder() {
  //   this.orderSvc.order(this.empid).subscribe((res) => {
  //     console.log(res);
  //     window.location.reload();
  //   })
  // }

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

  onEditQuantity(cartid: number){
    this.onEditClick=false;
  }

  onCancel(cartid:number){
    this.onEditClick=false;
  }
}
