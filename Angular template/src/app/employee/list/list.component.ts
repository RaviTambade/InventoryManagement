import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeServiceService } from '../employee-service.service';
import { Employee } from '../Employee';


@Component({
  selector: 'employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit  {

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
