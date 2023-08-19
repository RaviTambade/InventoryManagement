import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { MaterialService } from 'src/app/spa/material.service';
import { MaterialReport } from 'src/app/MaterialReport';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {
  public chart: any;
  data: string[] = [];
  report: MaterialReport[] = [];

  constructor(private svc: MaterialService ) {
  }
  ngOnInit(): void {
    this.svc.getAllStockReports().subscribe((res) => {
      this.report = res;
      console.log(this.report)
      if(this.report !=undefined){
      this.data = this.report.map((report)=>report.category );
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
            data: this.report.map((report)=>report.quantity),
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
