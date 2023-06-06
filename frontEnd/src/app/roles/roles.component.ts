import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';
import { Employee } from '../Employee';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  isSubmitted = false;
  roles  = [
      'Incharge',
      'Store Manager',
      'Supervisor',
      'Store Worker',     
  ];

  subscription: Subscription|undefined;
  employees : any  | undefined;

  constructor(public fb : FormBuilder,private svc : AppService) { }

  registrationForm = this.fb.group({
    roleName : [ ' ', [Validators.required]],
  });

  changeMaterial(e: any){
    this.roleName?.setValue(e.target.value,{
      onlySelf : true,
    });
  }

  //Access formcontrols getter
  
  get roleName(){
    return this.registrationForm.get('roleName');
  }

  ngOnInit(): void {
    this.subscription = this.svc.getData().subscribe((response) =>{
      this.employees = response.data;
      console.log(this.employees);
      console.log(response);
    })
  }

  onSubmit ():void {
    console.log(this.registrationForm);
    this.isSubmitted= true;
    if(!this.registrationForm.valid){
      false;
    }
    else{
      console.log("onSubmit");           
      console.log(JSON.stringify(this.registrationForm.value));
      this.svc.sendData(this.registrationForm.value);
    }
  }


}
