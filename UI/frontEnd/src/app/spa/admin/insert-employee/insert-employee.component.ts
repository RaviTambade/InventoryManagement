import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Employee';
import { User } from 'src/app/User';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent {

  departments: string[] = [];
  roles: string[] = [];
  isForm1Complete: boolean = false;
  newUser: User = {
    id: 1,
    aadharId: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: '',
    email: '',
    contactNumber: ''
  };
  newEmployee: Employee = {
    userId: 0,
    hireDate: new Date(),
    imgUrl: '',
    department: 'HR',
    role: 'Manager'
  };

  constructor(private svc: EmployeeService) { }

  ngOnInit() {
    this.svc.getDepartments().subscribe((res)=>{
      this.departments=res;
    })

    this.svc.getRoles().subscribe((res)=>{
      this.roles=res;
    })
  }
  onSubmit() {
    console.log(this.newUser);
    this.isForm1Complete = true;
  }

  onSubmit2() {
    console.log(this.newEmployee);
  }


}
