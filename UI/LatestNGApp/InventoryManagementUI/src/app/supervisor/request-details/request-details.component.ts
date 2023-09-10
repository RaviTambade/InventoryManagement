import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {
  @Input() selectedRequestId: number | null = null;
  requestDetails: any; 
  details:boolean=false;
  requestId:number|undefined;
  carts: any[];
  id: any;
  img: any;
  reqid: number = 0;
  materialid: number = 0;
  orderDetail: any;
  dateTime: string = '';
  date: any;
  editQuantity:boolean=false;
  item:any;
  constructor(private _requestsvc:RequestService) {
    this.carts=[];

  }
  ngOnInit(): void {
    if(this.selectedRequestId!==null){
      this.requestId =this.selectedRequestId;
      console.log(this.requestId)
    }
    
    this._requestsvc.selectedRequestId$.subscribe((id) => {
      this.requestId = id;
      if(this.requestId)
      this.getDetails(this.requestId);
      this.requestId=undefined;
    });
    
  }

getDetails(requestId:number){
  this._requestsvc.getRequestDetails(requestId).subscribe((res) => {
    this.carts = res;
    console.log(this.carts);
    this.details=true; 
  })
}

  onRemove(id: number) {
    this._requestsvc.removeItem(id).subscribe((res) => {
      console.log(res);
      window.location.reload();

    })
  }

  onEdit(){
    this.editQuantity=true;
  }
  onCancel(){
    this.editQuantity=false;
  }

  onEditQuantity(id:any, quantity:any){
    console.log(id)
    console.log(quantity);
    this.editQuantity=false;
    this.item.id=id;
    this.item.quantity=quantity;
    console.log(this.item);
    // this._requestsvc.updateRequestedItem(this.item).subscribe((res)=>{
    //   console.log(res);
    // })
    
  }


}
