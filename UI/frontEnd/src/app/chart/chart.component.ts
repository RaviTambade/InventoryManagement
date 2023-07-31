import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { parseISO, startOfWeek, endOfWeek, format } from 'date-fns';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { RequestService } from '../spa/request.service';
import { Period } from '../Period';
import { RequestReport } from '../RequestReport';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  period:any={
    "fromDate":"2023-07-17",
    "toDate":"2023-07-23"
  }
  weekIso: string = "2023-W28";
  startDate: string='';
  endDate: string='';
  requestReport:RequestReport[]=[];
  fromDate: any;
  constructor(private svc:RequestService){}
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:50,
        ticks: {
          stepSize: 5,
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
    this.svc.GetWeeklyReport(11,this.period).subscribe((res)=>{
      console.log(res);
      this.requestReport=res;
      // this.barChartData.labels=this.requestReport.map((report)=>report.day);
      this.barChartData.datasets[0].data=this.requestReport.map((report)=>report.requests);
    })
    this.calculateWeekDates()

  }
  public barChartData: ChartData<'bar'> = {
    labels: ['Monday','Tuesday','Wednesday','Thursday','Friday', 'Saturday','Sunday'],
    datasets: [{ data: [], label: 'Requests' },],
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

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }

  calculateWeekDates() {
    console.log("in")
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1); // Adjust for Sunday as 0
    const firstDate = new Date(today.setDate(diff));
    const lastDate = new Date(today.setDate(diff + 6));
    this.startDate = formatDate(firstDate, 'yy/MM/dd', 'en-US');
    this.endDate = formatDate(lastDate, 'yy/MM/dd', 'en-US');
    console.log(this.startDate)
    console.log(this.endDate);
  }
}




