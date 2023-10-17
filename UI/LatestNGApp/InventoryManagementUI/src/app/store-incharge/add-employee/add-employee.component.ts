import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { UserDetails } from 'src/app/Models/UserDetails';
import { Credential } from 'src/app/Models/credential';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  newUser: UserDetails = {
    id: 0,
    aadharId: '',
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: '',
    email: '',
    contactNumber: '',
    imageUrl: ''
  };
  roles: string[] = [];
  myCredential = new Credential('', 'password');
  newEmployee: Employee = {
    userId: 0,
    hireDate: new Date(),
    department: '',
    role: '',
    name: ''
  };

  userId:number=0;
  constructor(private usrsvc:UserService,private empsvc:EmployeeService, private authsvc:AuthenticationService) {
   }

  ngOnInit() {
    this.getRoles();
  }
  getRoles(){
    const role=localStorage.getItem("role");
    if(role=='Store Incharge'){
      this.roles=['Store Manager','Store Worker', 'Store Incharge']
    }
    else{
      this.roles=['Supervisor', 'Supervisor Incharge']
    }

  }

  onSubmit() {
    const filename = this.newUser.imageUrl.split('\\').pop();
    this.newUser.imageUrl = `./assets/img/${filename}`;
    console.log(this.newEmployee);
    this.myCredential.contactNumber=this.newUser.contactNumber;
    console.log(this.newEmployee);
    console.log(this.myCredential);
    console.log(this.newUser);
    
    // this.usrsvc.addUser(this.newUser).subscribe((res)=>{
    //   this.userId=res;
    //   console.log(res);
    //   if(this.userId!=0){
    //       this.addEmployee(this.userId)
    //   }
    // })
  }


  addEmployee(userId:number){
    this.newEmployee.userId=userId; 
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
    this.authsvc.register(credential).subscribe((res)=>{
      console.log(res);
      console.log("new Employee Added!!!")
    })
  }

}
