import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Employee';
import { User } from 'src/app/User';
import { EmployeeService } from '../../employee.service';
import { UserService } from '../../user.service';
import { Credential } from 'src/app/Credential';
import { AuthService } from '../../auth.service';

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
    imageUrl: '',
    department: 'HR',
    role: 'Manager'
  };
  userId:number=0;
  myCredential = new Credential('', 'password');


  constructor(private svc: EmployeeService,private usrsvc:UserService,private empsvc:EmployeeService,private autsvc:AuthService) { }

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
    console.log(this.newUser);
    console.log(this.newEmployee);
    const filename = this.newEmployee.imageUrl.split('\\').pop();
    this.newEmployee.imageUrl = `./assets/img/${filename}`;
    this.myCredential.contactNumber=this.newUser.contactNumber;
    console.log(this.newEmployee);
    console.log(this.myCredential);

    this.usrsvc.addUser(this.newUser).subscribe((res)=>{
      this.userId=res;
      console.log(res);
      if(this.userId!=0){
          this.addEmployee(this.userId)
      }
    })
  }


  addEmployee(userId:number){
    this.newEmployee.userId=userId; 
    this.newEmployee.imageUrl = `./assets/img/${this.newEmployee.imageUrl}`; 
    console.log(this.newEmployee);
    this.empsvc.addEmployee(this.newEmployee).subscribe((res)=>{
      console.log(res);
      if(res==true){
        this.addCredentials(this.myCredential);
      }
    })
  }

  addCredentials(credential:Credential)
  {
    this.autsvc.register(credential).subscribe((res)=>{
      console.log(res);
      console.log("new Employee Added!!!")
    })
  }

}
