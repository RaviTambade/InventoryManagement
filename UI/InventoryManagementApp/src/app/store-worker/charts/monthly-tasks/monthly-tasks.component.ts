import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TaskReport } from '../../TaskReport';
import { TasksService } from '../../tasks.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'monthly-tasks',
  templateUrl: './monthly-tasks.component.html',
  styleUrls: ['./monthly-tasks.component.css']
})
export class MonthlyTasksComponent {

  selectedMonthValue: string = '';
  empid: number = 16;
  public chart: any;
  data: any[] = [];
  report: TaskReport[] = [];
  month: number = 0;
  year: number = 0; 
  currentMonth: any | undefined; 
  currentYear: number | undefined; 
  numWeeks: number | undefined;
  weekList: string[] = [];
  firstDate = new Date;
  lastDate = new Date;
  period: any = {
    "fromDate": '',
    "toDate": ''
  }

  constructor(private svc: TasksService, private datePipe: DatePipe) {
    this.getCurrentMonthAndYear();
    this.calculateWeeks();
  }
  ngOnInit(): void {
    this.svc.getMonthlyReport(this.empid, this.period).subscribe((res) => {
      console.log(res);
      this.report = res;

      if (this.report != null) {
        for (const week of this.weekList) {
          const matchingData = this.report.find((item) => week.includes(item.period));
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
    const formattedDate = this.datePipe.transform(`${this.currentMonth} 1 2000`, 'M');
    var month = parseInt(formattedDate || '0');
    this.selectedMonthValue = `${this.currentYear}-${month}`;
    console.log(this.selectedMonthValue)
    this.getFirstAndLastDateOfMonth(this.selectedMonthValue);

  }

  calculateWeeks() {
    if (this.currentYear != undefined) {
      const lastDayOfMonth = new Date(this.currentYear, this.getMonthIndex(), 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const numWeeks = Math.ceil(daysInMonth / 7);
      this.numWeeks = numWeeks;
      console.log(this.numWeeks);
      if (this.numWeeks != undefined) {
        this.generateWeekList()
      }
    }

  }

  generateWeekList() {
    if (this.numWeeks != undefined) {
      for (let i = 1; i <= this.numWeeks; i++) {
        this.weekList.push(`week-${i}`);
        console.log(this.weekList)
      }
    }
  }



  getMonthIndex(): any {
    // Assuming the month names are in English, adjust the index if needed
    if (this.currentMonth != undefined) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return monthNames.indexOf(this.currentMonth);
    }

  }


  onMonthChange() {
    this.chart.destroy();
    this.report = [];
    this.data = [];
    console.log('Selected week:', this.selectedMonthValue);
    this.getFirstAndLastDateOfMonth(this.selectedMonthValue);

    this.svc.getMonthlyReport(this.empid, this.period).subscribe((res) => {
      console.log(res);
      this.report = res;

      if (this.report != null) {
        for (const week of this.weekList) {
          const matchingData = this.report.find((item) => week.includes(item.period));
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


  getFirstAndLastDateOfMonth(selectedMonth: string) {
    const [yearStr, monthStr] = selectedMonth.split('-');
    this.year = parseInt(yearStr);
    this.month = parseInt(monthStr);
    this.firstDate = new Date(this.year, this.month - 1, 1);
    this.lastDate = new Date(this.year, this.month, 0);
    this.period.fromDate = this.datePipe.transform(this.firstDate, 'yyyy/MM/dd');
    this.period.toDate = this.datePipe.transform(this.lastDate, 'yyyy/MM/dd');
    console.log(this.period)
  }

}
