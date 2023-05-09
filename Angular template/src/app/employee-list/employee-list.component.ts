import { Component, OnInit } from '@angular/core';
import { Employee } from 'app/Employee';
import { EmployeeServiceService } from 'app/employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit  {

  employees:Employee[] |undefined;
  constructor(private svc:EmployeeServiceService){}
  
  ngOnInit(): void {
    this.svc.getAll().subscribe((response)=>
    {
        this.employees=response;
        console.log(response);
    })
  }

}
