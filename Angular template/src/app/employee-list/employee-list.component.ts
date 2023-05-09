import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'app/Employee';
import { EmployeeServiceService } from 'app/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit  {

  employees:Employee[] |undefined;
  constructor(private svc:EmployeeServiceService, private router:Router){}
  
  ngOnInit(): void {
    this.svc.getAll().subscribe((response)=>
    {
        this.employees=response;
        console.log(response);
    })
  }

  onSelectEmployee(employee:any){
    if(employee!=undefined)
    this.router.navigate(['Employee/employee',employee.employeeId]);
    console.log(employee);
  }
  
}
