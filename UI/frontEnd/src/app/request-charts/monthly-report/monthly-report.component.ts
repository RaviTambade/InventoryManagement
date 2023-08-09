import { Component } from '@angular/core';
import { MaterialReport } from 'src/app/MaterialReport';
import { RequestReport } from 'src/app/RequestReport';
import { RequestService } from 'src/app/spa/request.service';
import Chart from 'chart.js/auto';
import { Period } from 'src/app/Period';
import { DatePipe } from '@angular/common';
import {  startOfMonth, addDays, format, getISOWeek } from 'date-fns';

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent {
  selectedWeekValue: string='';
  public currentDate=new Date();
  public chart: any;
  public date1=new Date;
  public date2=new Date;
  
  period:any= {
    "fromDate":'2023/08/01',
    "toDate":'2023/08/30'
  }
  days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  data: any[] = [];
  report: RequestReport[] = [];
  month!: string ; // Replace with desired month name
  year: number = 2023; // Replace with desired year
  currentMonth: any | undefined; // Use union type with undefined
  currentYear: number | undefined; // Use union type with undefined
  numWeeks:number | undefined ;
  weekList: string[] = [];
  constructor(private svc: RequestService, private datePipe:DatePipe) {
    this.getCurrentMonthAndYear();
    this.calculateWeeks();
   }
  ngOnInit(): void {
    this.svc.GetMonthlyReport(12, this.period).subscribe((res) => {
      console.log(res);
      this.report = res;

      if (this.report != null) {
        console.log("in if");
        for (const week of this.weekList) {
          console.log("for")
          const matchingData = this.report.find((item) => week.includes(item.period));
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
        labels: this.weekList,

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

  
  getCurrentMonthAndYear() {
    const currentDate = new Date();
    const formattedMonth = this.datePipe.transform(currentDate, 'MMMM');
    this.currentMonth = formattedMonth || ''; // Use empty string as fallback
    this.currentYear = currentDate.getFullYear();
    console.log(this.currentMonth);
    console.log(this.currentYear);
  }

  calculateWeeks() {
    if(this.currentYear!=undefined){
      const lastDayOfMonth = new Date(this.currentYear, this.getMonthIndex(), 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const numWeeks = Math.ceil(daysInMonth / 7);
      this.numWeeks = numWeeks;
      console.log(this.numWeeks);
      if(this.numWeeks!=undefined){
        this.generateWeekList()
      }
    }

  }

  generateWeekList() {
    if(this.numWeeks!=undefined){
      for (let i = 1; i <= this.numWeeks; i++) {
        this.weekList.push(`week-${i}`);
        console.log(this.weekList)
      }
    }
   
  }
  // calculateWeekDates() {
  //   if(this.currentYear!=undefined){
  //     const startDate = new Date(this.currentYear, 0, 1); // January 1 of the year
  //     const daysToAdd = (this.numWeeks - 1) * 7;
  //     startDate.setDate(startDate.getDate() + daysToAdd);
  
  //     this.startDate = startDate;
  //     this.endDate = new Date(startDate);
  //     this.endDate.setDate(this.endDate.getDate() + 6); // Adding 6 days for the end of the week
  //     console.log(this.startDate)
  //     console.log(this.endDate)
  //   }
  // }


  
  getMonthIndex(): any {
    // Assuming the month names are in English, adjust the index if needed
    if(this.currentMonth!=undefined){
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthNames.indexOf(this.currentMonth);
    }

  }


  onWeekChange() {
    this.chart.destroy();
    this.report=[];
    this.data=[];
    console.log('Selected week:', this.selectedWeekValue);
    this.getFirstAndLastDateOfWeek(this.selectedWeekValue);

    this.svc.GetWeeklyReport(12, this.period).subscribe((res) => {
      console.log(res);
      this.report = res;
      if (this.report != null) {
        console.log("in if");
        for (const day of this.days) {
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
