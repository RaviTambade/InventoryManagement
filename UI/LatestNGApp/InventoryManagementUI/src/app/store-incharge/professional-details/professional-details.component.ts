import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { Credential } from 'src/app/Models/credential';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-professional-details',
  templateUrl: './professional-details.component.html',
  styleUrls: ['./professional-details.component.css']
})
export class ProfessionalDetailsComponent {

  departments: string[] = [];
  roles: string[] = [];
  myCredential = new Credential('', 'password');
  newEmployee: Employee = {
    userId: 0,
    hireDate: new Date(),
    department: 'HR',
    role: 'Manager',
    name: ''
  };
  constructor(private usrsvc:UserService,private empsvc:EmployeeService,) { }

  ngOnInit() {
    this.empsvc.getDepartments().subscribe((res)=>{
      this.departments=res;
    })

    this.empsvc.getRoles().subscribe((res)=>{
      this.roles=res;
    })
  }

  onSubmit2() {
    console.log();
    console.log(this.newEmployee);
    // const filename = this.newEmployee.imageUrl.split('\\').pop();
    // this.newEmployee.imageUrl = `./assets/img/${filename}`;
    // this.myCredential.contactNumber=this.newUser.contactNumber;
    console.log(this.newEmployee);
    console.log(this.myCredential);

    // this.usrsvc.addUser(this.newUser).subscribe((res)=>{
    //   this.userId=res;
    //   console.log(res);
    //   if(this.userId!=0){
    //       this.addEmployee(this.userId)
    //   }
    // })
  }


  // addEmployee(userId:number){
  //   this.newEmployee.userId=userId; 
  //   this.newEmployee.imageUrl = `./assets/img/${this.newEmployee.imageUrl}`; 
  //   console.log(this.newEmployee);
  //   this.empsvc.addEmployee(this.newEmployee).subscribe((res)=>{
  //     console.log(res);
  //     if(res==true){
      //  this.addCredentials(this.myCredential);
  //     }
  //   })
  // }

  // addCredentials(credential:Credential)
  // {
  //   this.autsvc.register(credential).subscribe((res)=>{
  //     console.log(res);
  //     console.log("new Employee Added!!!")
  //   })
  // }
}
