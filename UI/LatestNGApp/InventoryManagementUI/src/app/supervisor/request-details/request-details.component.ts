import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RequestService } from 'src/app/Services/request.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {
  @Input() selectedRequestId: number | null = null; // Receive the selected request ID
  requestDetails: any; // Define a variable to store details
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

  constructor(private _requestsvc:RequestService,private route: ActivatedRoute) {
    this.carts=[];

  }
  ngOnInit(): void {
    if(this.selectedRequestId!==null){
      this.requestId =this.selectedRequestId;
      console.log(this.requestId)
    }
    
    this._requestsvc.selectedRequestId$.subscribe((id) => {
      this.requestId = id;
      console.log(this.requestId)
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




}
