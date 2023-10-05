import { Component } from '@angular/core';
import { Employee } from 'src/app/Models/Employee';
import { User } from 'src/app/Models/User';
import { UserDetails } from 'src/app/Models/UserDetails';
import { EmployeeService } from 'src/app/Services/employee.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.css']
})
export class PersonalDetailsComponent {

  isForm1Complete: boolean = false;
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

  userId:number=0;
  constructor() { }

  ngOnInit() {

  }
  onSubmit() {
    console.log(this.newUser);
    this.isForm1Complete = true;
  }



}
