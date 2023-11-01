import { Component, OnInit } from '@angular/core';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { OrderService } from 'src/app/Services/order.service';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit {

  empid: number = 0;
  trays: any[] = [];
  updatedTray: any;
  data: any[] = [];
  trayId: number | undefined;
  onEditClick: boolean = false;
  count = 0;
  modified: boolean = false;
  modifiedId:number[]=[];
  

  constructor(private initialRequest: InitialRequestService, private requestSvc: RequestService, private svc: InitialRequestService) {

    this.updatedTray = {
      id: 0,
      quantity: 0
    }
    this.getEmployeeId();
  }

  ngOnInit(): void {
    this.getTray();
  }

  getEmployeeId(){
    const id=localStorage.getItem("userId");
    if(id){
     this.empid=Number.parseInt(id);
    }
  }

  getTray() {
    this.initialRequest.getTray(this.empid).subscribe((res) => {
      console.log(res);
      this.data=res;
      this.trays = JSON.parse(JSON.stringify(res));
      this.data = JSON.parse(JSON.stringify(res));
    })
  }

  onRemove(id: number) {
    this.initialRequest.remove(id).subscribe((res) => {
      if (res) {
        window.location.reload();
      }
    })
  }

  onRequest() {
    this.requestSvc.request(this.empid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  onRemoveAll() {
    this.initialRequest.removeAll(this.empid).subscribe((res) => {
      console.log(res);
      window.location.reload();
    })
  }

  onEdit(cartid: number) {
    console.log("edit");
    this.trayId = cartid;
    this.onEditClick = true;
  }

  onEditQuantity(trayId: number, quantity: number) {
    this.onEditClick = false;
    this.updatedTray.id = trayId;
    this.updatedTray.quantity = quantity;
    console.log(this.updatedTray);
    this.svc.updateQuantity(this.updatedTray).subscribe((res)=>{
      console.log(res);
    })
  }

  increment(id: number) {
    this.modified = true;
    const index = this.trays.findIndex((tray) => tray.id === id);
    this.trays[index].quantity++;

  }

  decrement(id: number) {
    this.modified = true;
    if (id > 0) {
      const index = this.trays.findIndex((tray) => tray.id === id);
      this.trays[index].quantity--;
    }
  }
}
