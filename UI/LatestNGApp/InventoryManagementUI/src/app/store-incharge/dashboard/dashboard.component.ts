import { Component } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  showEmployeesData = false;
  showInventoryData = false;
  showTodaysOrders = false;
  showAllOrders = false;
  order:any;
  count:any;

  constructor(private _empSvc:EmployeeService,private svc:DashboardService){

  }
  ngOnInit():void{
    this._empSvc.getEmployees().subscribe((res)=>{
      console.log(res)
    })
    this.getAllOrders();
    this.getTotalAndCounts();

  }

  getAllOrders(){
    this.svc.getAllOrdersCount().subscribe((res)=>{
     this.order=res;
     console.log(res);
    })
  }

  getTotalAndCounts(){
    this.svc.getTotalAndCounts().subscribe((res)=>{
     this.count=res;
     console.log(res);
    })
  }

}
