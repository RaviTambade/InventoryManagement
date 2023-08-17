import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent {
  updateForm!: FormGroup ;
  userId: number=2;
  user: User | undefined;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,private userService: UserService){}

  ngOnInit(): void {
    this.getUserData(this.userId);
    // this.route.paramMap.subscribe((param) => {
    //   var id = param.get('requestid')
    //   if(id!=null){
    //     this.userId = Number.parseInt(id)
    //     console.log(this.userId)
    //   this.getUserData(this.userId)
    //   }
    // })

    this.updateForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactnumber: ['', Validators.required],
      aadharid: ['', Validators.required]
    });
  }

  getUserData(userId: number): void {
    console.log("fn")
    this.userService.getUser(userId).subscribe((user: User) => {
      this.user = user;
      console.log(user);
      this.updateForm.patchValue({
        firstname: user.firstName,
        lastname: user.lastName,
        birthdate: user.birthDate,
        gender: user.gender,
        email: user.email,
        contactnumber: user.contactNumber,
        aadharid:user.aadharId
      });
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      this.user = this.updateForm.value as User;
      console.log(this.user);
      this.userService.updateUser(this.userId, this.user).subscribe((res) => {
        console.log(res)
        // Handle successful update, e.g., show a success message or navigate to another page
      });
    }
  }
}
