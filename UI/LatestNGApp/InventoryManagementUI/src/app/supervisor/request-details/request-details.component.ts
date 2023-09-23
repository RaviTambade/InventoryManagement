import { Component, Input } from '@angular/core';
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
    const id = this.getRequestId();
  }

  getRequestId() {
    this._requestsvc.selectedRequestId$.subscribe((id) => {
      console.log(id)
      const requestId = id;
      if (requestId == 0 || requestId == null) {
        this.details = false;
        this.carts = [];
      }
      else
        this.getDetails(id);

    });

  }

  getDetails(requestId: number) {
    this.editQuantity=false;
    console.log("req", requestId)
    this._requestsvc.getRequestDetails(requestId).subscribe((res) => {
      this.carts = res;
      this.getUser();
      console.log(this.carts);
      this.details = true;
    })
  }

  getUser() {
    const shipperId=this.carts[0].shipperId;
    console.log(shipperId);
    this._usersvc.getUser(shipperId).subscribe((res)=>{
      console.log(res[0]);
      this.shipper=res[0];
      this.shipperName=res[0].name;
      console.log(this.shipperName);
      console.log(this.shipper);
      this.isShipper=true;
    })
   }

  onRemove(id: number) {
    this._requestsvc.removeItem(id).subscribe((res) => {
      console.log(res);
      window.location.reload();

    })
  }

  onEdit(id: any) {
    console.log(id);
    this.cartId = id;
    this.editQuantity = true;
  }
  onCancel() {
    this.editQuantity = false;
  }

  onEditQuantity(id: any, quantity: any) {
    console.log(id)
    console.log(quantity);
    this.item.id = id;
    this.item.quantity = quantity;
    console.log(this.item);
    this._requestsvc.updateRequestedItem(this.item).subscribe((res)=>{
      console.log(res);
      window.location.reload();
    })
    this.editQuantity=false;
  }
}
