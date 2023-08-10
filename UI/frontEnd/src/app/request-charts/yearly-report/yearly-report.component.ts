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
  years: number[] = [];
  months:string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  data: any[] = [];
  report: RequestReport[] = [];

  constructor(private svc: RequestService, private datePipe:DatePipe) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear ; year >= currentYear - 10; year--) {
      this.years.push(year);
    }
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

    this.svc.GetYearlyReport(this.empid, this.selectedYearValue).subscribe((res) => {
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




}
