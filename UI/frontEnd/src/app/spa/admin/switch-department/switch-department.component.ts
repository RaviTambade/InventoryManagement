import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'switch-department',
  templateUrl: './switch-department.component.html',
  styleUrls: ['./switch-department.component.css']
})
export class SwitchDepartmentComponent {

  constructor(private svc:EmployeeService){}
  ngOnInit() {
    this.svc.getEmployees().subscribe((res)=>{
      console.log(res);
    })
  }
}
