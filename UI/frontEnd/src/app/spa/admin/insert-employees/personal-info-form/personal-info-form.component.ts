import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Credential } from 'src/app/Credential';
import { PersonalInfo } from 'src/app/PersonalInfo';
import { User } from 'src/app/User';
import { AuthService } from 'src/app/spa/auth.service';
import { UserService } from 'src/app/spa/user.service';

@Component({
  selector: 'personalform',
  templateUrl: './personal-info-form.component.html',
  styleUrls: ['./personal-info-form.component.css']
})
export class PersonalInfoFormComponent {
  
  defaultPassword:string='SVRP123'
  formData: User = {
    id: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date,
    gender: '',
    email: '',
    contactNumber: '',
    aadharId: '',
  };
  credential:Credential={
    contactNumber: '',
    password:this.defaultPassword
  }
  constructor(private router:Router, private svc:AuthService,private usrsvc:UserService){

  }

  submitForm() {
    console.log('Form submitted:', this.formData);
    this.credential.contactNumber=this.formData.contactNumber;
    localStorage.setItem("personalInfo",JSON.stringify(this.formData));
     localStorage.setItem("credentials",JSON.stringify(this.credential));
     this.router.navigate(['profileform']);
     // this.usrsvc.addUser(this.formData).subscribe((res)={
    //   console.log(res)
    // })

  }
}
