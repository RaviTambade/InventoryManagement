import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'app/Employee';
import { EmployeeServiceService } from 'app/employee-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent  {
  

  @Input() employeeId: number | undefined;
  employee: Employee | undefined;

  constructor(private svc: EmployeeServiceService) { }
  
  ngOnInit(): void {
    if(this.employeeId!=undefined){
    this.svc.getById(this.employeeId).subscribe((response) => {
    this.employee = response;
    console.log(response);
})
}
}

  getCustomerById(id: any) {
    this.svc.getById(id).subscribe((response) => {
      this.employee = response;
      this.employee = response;
      console.log(response);
      console.log(this.employee);
    })
  }
}
