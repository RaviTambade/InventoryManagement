import { Component, OnInit } from '@angular/core';
import { FormBuilder ,Validators} from '@angular/forms';
import { MaterialTestService } from '../material-test.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent  {

  isSubmitted = false;
  materials  = [
      'Bearings',
      'Housing',
      'Top Cover',
      'Main Shaft',
  ];

  constructor(public fb : FormBuilder,private svc : MaterialTestService) { }

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
