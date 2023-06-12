import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  orders: any[] | undefined;
  id:number=12;

  constructor(private svc: AppService) { }

  ngOnInit(): void {
    this.svc.getOrdersHistory(12).subscribe((res) => {
      console.log(res);
      this.orders = res;
    })
  }
  
}
