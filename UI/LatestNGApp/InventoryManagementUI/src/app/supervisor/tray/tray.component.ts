import { Component, OnInit } from '@angular/core';
import { InitialRequestService } from 'src/app/Services/initial-request.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-tray',
  templateUrl: './tray.component.html',
  styleUrls: ['./tray.component.css']
})
export class TrayComponent implements OnInit {

  empid: number = 21;
  trays: any[] = [];
  updatedTray: any;
  data: any[] = [];
  trayId: number | undefined;
  onEditClick: boolean = false;
  count = 0;
  modified: boolean = false;
  modifiedId:number[]=[];
  

  constructor(private requestSvc: InitialRequestService, private orderSvc: OrderService, private svc: InitialRequestService) {

    this.updatedTray = {
      id: 0,
      quantity: 0
    }
  }

  ngOnInit(): void {
    this.getTray();
  }


  getTray() {
    this.requestSvc.getTray(this.empid).subscribe((res) => {
      console.log(res);
      this.data=res;
      this.trays = JSON.parse(JSON.stringify(res));
      this.data = JSON.parse(JSON.stringify(res));
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
