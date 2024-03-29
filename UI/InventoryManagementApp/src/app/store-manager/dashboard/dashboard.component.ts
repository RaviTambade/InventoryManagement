import { Component } from '@angular/core';
 import Chart from 'chart.js/auto';

import { MaterialService } from 'src/app/Services/material.service';
import { MaterialReport } from '../Models/MaterialReport';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public chart: any;
  data: string[] = [];
  reports: MaterialReport[] = [];
  empid:number=2;
  constructor(private svc: MaterialService ) {
  }
  ngOnInit(): void {
    this.svc.getStockReports(this.empid).subscribe((res) => {
      this.reports = res;
      console.log(this.reports)
      if(this.reports.length!=0){
       this.data = this.reports.map((report)=>report.name );
      }
        this.createChart();
     })

  }

  createChart() {
    this.chart = new Chart("MyChart", {

      type: 'pie', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.data,

        datasets: [
          {
            label: "Requests",
            data: this.reports.map((report)=>report.quantity),
            backgroundColor: 'orange'
          }
        ]
      },
      options: {
        scales: {
          x: {},
          y: {
            min: 0,
            max: 2000,
            ticks: {
              stepSize: 100,
            },
          },
        },
      }

    });
  }
}
