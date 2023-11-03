import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {
  requestDetails: any;
  changeQuantity: boolean = false;
  details: boolean = false;
  requestId: number | undefined;
  carts: any[];
  id: any;
  img: any;
  reqid: number = 0;
  materialid: number = 0;
  orderDetail: any;
  dateTime: string = '';
  date: any;
  editQuantity: boolean = false;
  item: any;
  cartId: number | any;
  shipperName:string='';
  shipper:any={
    id:0,
    name:""
  };
  isShipper:boolean=false;

  constructor(private _requestsvc: RequestService,private _usersvc:UserService ) {
    this.carts = [];
    this.item = {
      "id": 0,
      "quantity": 0,
    };
  }
  ngOnInit(): void {
    this._requestsvc.selectedRequestId$.subscribe((id) => {
      const requestId = id;
      if (requestId == 0 || requestId == undefined) {
        this.details = false;
        this.carts = [];
      }
      else{
      this.editQuantity=false;
      this._requestsvc.getRequestDetails(requestId).subscribe((res) => {
        this.carts = res;
        // this.getUser();
        const shipperId=this.carts[0].shipperId;
        this._usersvc.getUser(shipperId).subscribe((res)=>{
        this.shipper=res[0];
        this.shipperName=res[0].name;
        this.isShipper=true;
        })
        this.details = true;
      })
     }
    });
  }

  onRemove(id: number) {
    this._requestsvc.removeItem(id).subscribe((res) => {
      window.location.reload();

    })
  }

  onEdit(id: any) {
    this.cartId = id;
    this.editQuantity = true;
  }
  onCancel() {
    this.editQuantity = false;
  }

  onEditQuantity(id: any, quantity: any) {
    this.item.id = id;
    this.item.quantity = quantity;
    this._requestsvc.updateRequestedItem(this.item).subscribe((res)=>{
      window.location.reload();
    })
    this.editQuantity=false;
  }
}
