import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DatePipe } from '@angular/common';
import { MaterialService } from 'src/app/spa/material.service';
import { MaterialReport } from 'src/app/MaterialReport';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {
  selectedWeekValue: string='';
  public currentDate=new Date();
  public chart: any;
  public date1=new Date;
  public date2=new Date;
  
  period:any= {
    "fromDate":'',
    "toDate":''
  }
  days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  data: string[] = [];
  resData:string[]=[];
  report: MaterialReport[] = [];

  constructor(private svc: MaterialService, private datePipe:DatePipe) {
    this.calculateWeekStartAndEnd(this.currentDate);
  }
  ngOnInit(): void {
    this.svc.getAllStockReports().subscribe((res) => {
      this.report = res;
      console.log(this.report)
      if(this.report !=undefined){
      this.data = this.report.map((report)=>report.name );
      }


     
    //   if (this.report != null) {
    //     for (const day of this.days) {
    //       const matchingData = this.report.find((item) => day.includes(item.quantity));
    //       if (matchingData) {
    //         this.data.push(matchingData.requests);
    //         console.log(this.data);
    //       } else {
    //         this.data.push(0); // If data not available for the day, use 0
    //       }
    //     }
        this.createChart();
    //    }
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

  calculateWeekStartAndEnd(date: Date) {
    const currentDay = date.getDay();
    // Assuming Sunday is the first day of the week (0 index), and Saturday is the last day (6 index).
    const firstDayOffset = currentDay === 0 ? 6 : currentDay - 1;
    const lastDayOffset = 6 - currentDay;

    // this.firstDayOfWeek = new Date(date);
    this.date1.setDate(date.getDate() - firstDayOffset);
    this.period.fromDate = this.datePipe.transform(this.date1, 'yyyy/MM/dd');
    // this.lastDayOfWeek = new Date(date);
    this.date2.setDate(date.getDate() + lastDayOffset);
    this.period.toDate = this.datePipe.transform(this.date2, 'yyyy/MM/dd');

    console.log(this.period);
  }


  onWeekChange() {
    this.chart.destroy();
    this.report=[];
    this.data=[];
    console.log('Selected week:', this.selectedWeekValue);
    this.getFirstAndLastDateOfWeek(this.selectedWeekValue);

    this.svc.getAllStockReports().subscribe((res) => {
      console.log(res);
      this.report = res;
      // if (this.report != null) {
      //   console.log("in if");
      //   for (const day of this.days) {
      //     console.log("for")
      //     const matchingData = this.report.find((item) => day.includes(item.period));
      //     if (matchingData) {
      //       this.data.push(matchingData.requests);
      //       console.log(this.data);
      //     } else {
      //       this.data.push(0); // If data not available for the day, use 0
      //     }
      //   }
      //   this.createChart();
      // }
    })
    }


   getFirstAndLastDateOfWeek(selectedWeek: string) {
    const [year, week] = selectedWeek.split('-W').map(Number);
  
    // Get the date of the first day of the year
    const firstDateOfYear = new Date(year, 0, 1);
  
    // Find the first day of the selected week (Monday)
    const firstWeekStart = new Date(firstDateOfYear);
    const dayOffset = firstWeekStart.getDay() || 7; // Convert Sunday to 7
    const daysToAdd = (week - 1) * 7 + (dayOffset === 1 ? 0 : 1); // If the first day of the year is Monday, we add 0 days, otherwise, we add 1 day
    firstWeekStart.setDate(firstWeekStart.getDate() + daysToAdd);
  
    // Calculate the last day of the selected week (Sunday)
    const lastWeekStart = new Date(firstWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() + 6);
  
        this.period.fromDate= this.datePipe.transform(firstWeekStart, 'yyyy/MM/dd');
    this.period.toDate=this.datePipe.transform(lastWeekStart, 'yyyy/MM/dd');
    console.log(this.period)
  }


}
