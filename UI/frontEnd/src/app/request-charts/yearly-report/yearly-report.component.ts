import { Component } from '@angular/core';
import { MaterialReport } from 'src/app/MaterialReport';
import { RequestReport } from 'src/app/RequestReport';
import { RequestService } from 'src/app/spa/request.service';
import Chart from 'chart.js/auto';
import { Period } from 'src/app/Period';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-yearly-report',
  templateUrl: './yearly-report.component.html',
  styleUrls: ['./yearly-report.component.css']
})
export class YearlyReportComponent {
  selectedYearValue: string='';
  public currentDate=new Date();
  public chart: any;
  empid:number=11;

  months:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  data: any[] = [];
  report: RequestReport[] = [];

  constructor(private svc: RequestService, private datePipe:DatePipe) {
  }
  ngOnInit(): void {
    this.svc.GetYearlyReport(this.empid, "2023").subscribe((res) => {
      console.log(res);
      this.report = res;
      if (this.report != null) {
        for (const month of this.months) {
          console.log("for")
          const matchingData = this.report.find((item) => month.includes(item.period));
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
            max: 20,
            ticks: {
              stepSize: 2,
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

    this.svc.GetYearlyReport(this.empid, "2023").subscribe((res) => {
      console.log(res);
      this.report = res;
      if (this.report != null) {
        console.log("in if");
        for (const day of this.months) {
          console.log("for")
          const matchingData = this.report.find((item) => day.includes(item.period));
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




}
