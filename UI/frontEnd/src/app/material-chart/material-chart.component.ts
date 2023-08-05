import { Component,ViewChild } from '@angular/core';
import { MaterialService } from '../spa/material.service';
import { MaterialReport } from '../MaterialReport';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-material-chart',
  templateUrl: './material-chart.component.html',
  styleUrls: ['./material-chart.component.css']
})
export class MaterialChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  materialReport:MaterialReport[]=[];
  constructor(private svc:MaterialService){}

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:2000,
        ticks: {
          stepSize: 200,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  ngOnInit():void{
    this.svc.getAllStockReports().subscribe((res)=>{
      console.log(res);
      this.materialReport=res;
      this.barChartData.datasets[0].data=this.materialReport.map((report)=>report.quantity);
      this.barChartData.labels=this.materialReport.map((report)=>report.name);
      console.log(this.barChartData.labels)
      console.log(this.barChartData.datasets[0].data)
    })
  }
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Quantity' },],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }


}
