import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/Employee';
import { User } from 'src/app/User';

@Component({
  selector: 'insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent {
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

  onSubmit() {
    // You can access the form values from this.newUser
    console.log(this.newUser);
    this.isForm1Complete=true;
    // Here, you can send the data to your API or perform other actions.
  }

  onSubmit2() {
    // You can access the form values from this.newEmployee
    console.log(this.newEmployee);
    // Here, you can send the data to your API or perform other actions.
  }
  
  isForm1Complete: boolean = false;
  formData1: any = {}; // Store data from the first form
  formData2: any = {}; // Store data from the second form

  // Create a function to handle the submission of the first form
  submitForm1(userForm: NgForm) {
    // Access the form data using userForm.value
    const formData = userForm.value;
    console.log(formData);
  }

  // Create a function to handle the submission of the second form
  submitForm2() {
    // Handle the submission of the second form data
    console.log(this.formData1); // Access data from the first form
    console.log(this.formData2); // Access data from the second form
  }
}
