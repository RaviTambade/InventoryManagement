import { Component, Input, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { Employee } from '../Employee';

@Component({
  selector: 'employee-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent  {
  

  @Input() employeeId: number | undefined;
  employee: Employee | undefined;

  constructor(private svc: EmployeeServiceService) { }
  
  ngOnInit(): void {
    if(this.employeeId!=undefined){
    this.svc.getById(this.employeeId).subscribe((response) => {
    console.log(response);
})
}
}
  onUpdate(employeeId:number){
    console.log(employeeId);
    this.svc.SendData(employeeId);
  }

  getEmployeeById(id: any) {
    this.svc.getById(id).subscribe((response) => {
      this.employee = response;
      console.log(this.employee);
    })
  }
}
