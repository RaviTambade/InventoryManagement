import { Component } from '@angular/core';
import { TaskReport } from '../../TaskReport';
import { TasksService } from '../../tasks.service';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'yearly-tasks',
  templateUrl: './yearly-tasks.component.html',
  styleUrls: ['./yearly-tasks.component.css']
})
export class YearlyTasksComponent {
  selectedYearValue: string='';
  public currentDate=new Date();
  public chart: any;
  empid:number=16;
  years: number[] = [];
  months:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  data: any[] = [];
  report: TaskReport[] = [];
  currentYear:string='';
  constructor(private svc: TasksService) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear ; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
    this.currentYear = new Date().getFullYear().toString();
  }
  ngOnInit(): void {
    this.svc.getYearlyReport(this.empid, this.currentYear).subscribe((res) => {
      console.log(res);
      this.report = res;
      if (this.report != null) {
        for (const month of this.months) {
          console.log("for")
          const matchingData = this.report.find((item) => month.includes(item.period));
          if (matchingData) {
            this.data.push(matchingData.tasks);
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
    this.chart = new Chart("MyChart3", {

      type: 'bar', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: this.months,

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
            max: 50,
            ticks: {
              stepSize: 5,
            },
          },
        },
      }

    });
  }

  onYearChange() {
    this.chart.destroy();
    this.report=[];
    this.data=[];
    console.log('Selected week:', this.selectedYearValue);

    this.svc.getYearlyReport(this.empid, this.selectedYearValue).subscribe((res) => {
      console.log(res);
      this.report = res;
      if (this.report != null) {
        for (const month of this.months) {
          const matchingData = this.report.find((item) => month.includes(item.period));
          if (matchingData) {
            this.data.push(matchingData.tasks);
            console.log(this.data);
          } else {
            this.data.push(0); // If data not available for the day, use 0
          }
        }
        this.createChart();
      }
    })
    }
}
