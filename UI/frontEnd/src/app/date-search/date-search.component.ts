import { formatDate } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-date-search',
  templateUrl: './date-search.component.html',
  styleUrls: ['./date-search.component.css']
})
export class DateSearchComponent {

  @Input() fDate: Date | undefined;
  @Input() tDate: Date | undefined;
  orders: any[] | undefined;
  period: any = {
    fromDate: '',
    toDate: ''
  }
  constructor(private svc: AppService) { }

  getOrderHistoryByDate(fDate: any, tDate: any) {
    this.period.fromDate = fDate
    this.period.toDate = tDate
    console.log(this.period);
    this.svc.getOrderHistoryByDate(this.period).subscribe((res) => {
      console.log(res);
      this.orders = res;
    })
  }
}
