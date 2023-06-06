import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

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

  onSubmit ():void {
    console.log(this.registrationForm);
    this.isSubmitted= true;
    if(!this.registrationForm.valid){
      false;
    }
    else{
      console.log("onSubmit");           
      console.log(JSON.stringify(this.registrationForm.value));
        }
  }


}
