import { Component } from '@angular/core';
// import { Chart } from 'chart.js';
import { MaterialReport } from 'src/app/MaterialReport';
import { RequestReport } from 'src/app/RequestReport';
import { RequestService } from 'src/app/spa/request.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.css']
})
export class WeeklyReportComponent {

  year: number = 2020;
  orders: any;
  public chart: any;
  month: any[] = [];
  totalCount: any[] = [];
  period: any = {
    "fromDate": "2023-07-17",
    "toDate": "2023-07-23"
  }
  days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  data: any[] = [];
  report: RequestReport[] = [];

  constructor(private svc: RequestService) {
    this.orders = [];

  }
  ngOnInit(): void {
    this.svc.GetWeeklyReport(11, this.period).subscribe((res) => {
      console.log(res);
      this.report = res;
      if (this.report != null) {
        console.log("in if");
        for (const day of this.days) {
          console.log("for")
          const matchingData = this.report.find((item) => day.includes(item.day));
          if (matchingData) {
            this.data.push(matchingData.requests);
            console.log(this.data);
          } else {
            this.data.push(0); // If data not available for the day, use 0
          }
        }
        this.createChart();
      }
    })

  }

  createChart() {
    this.chart = new Chart("MyChart", {

      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.days,

        datasets: [
          {
            label: "Requests",
            data: this.data,
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        scales: {
          x: {},
          y: {
            min: 0,
            max: 20,
            ticks: {
              stepSize: 2,
            },
          },
        },
      }

    });
  }
}
