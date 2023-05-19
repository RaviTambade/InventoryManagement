import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CatagoryService } from '../catagory.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.scss']
})
export class CatagoriesComponent  {

  isSubmitted = false;
  materials  = [
      'Bearing',
      '1st Gear',
      '2nd Gear',
      '3rd Gear',
      'Reverse Gear',
      'Main Shaft',
      'Counter Shaft',
      'Housing',
      
  ];

  constructor(public fb : FormBuilder,private svc : CatagoryService) { }

  registrationForm = this.fb.group({
    MaterialName : [ ' ', [Validators.required]],
  });

  changeMaterial(e: any){
    this.MaterialName?.setValue(e.target.value,{
      onlySelf : true,
    });
  }

  //Access formcontrols getter
  
  get MaterialName(){
    return this.registrationForm.get('MaterialName');
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
