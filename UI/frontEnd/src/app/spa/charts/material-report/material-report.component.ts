import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { MaterialReport } from 'src/app/MaterialReport';
import { MaterialService } from '../../material.service';

@Component({
  selector: 'app-material-report',
  templateUrl: './material-report.component.html',
  styleUrls: ['./material-report.component.css']
})
export class MaterialReportComponent {
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
    this.svc.getStockReports(1).subscribe((res)=>{
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
