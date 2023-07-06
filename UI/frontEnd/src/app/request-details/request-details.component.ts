import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';
import { Order } from '../Order';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  @Input() orderId: number | undefined;
  orderDetails: any | undefined;

  constructor(private svc: AppService ) { }
  
  getOrderDetails(id: any) {
    this.svc.getOrderDetails(id).subscribe((response) => {
      this.orderDetails = response;
      console.log(this.orderDetails);
    })
  }
}
