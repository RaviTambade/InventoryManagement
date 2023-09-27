import { Component } from '@angular/core';
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

  constructor(private _empSvc:EmployeeService){

  }
  ngOnInit():void{
    this._empSvc.getEmployees().subscribe((res)=>{
      console.log(res)
    })
  }

}
