import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-radio-search',
  templateUrl: './radio-search.component.html',
  styleUrls: ['./radio-search.component.css']
})
export class RadioSearchComponent {
  names:any=[];
  employees:any=[];
  constructor(private svc:AppService){}
  form = new FormGroup({
    gender: new FormControl('', Validators.required)
  });
   
  
  get f(){
    return this.form.controls;
  }
   

  changeGender(e:any) {
    console.log(e.target.value);
    this.svc.getByGender(e.target.value).subscribe((res)=>{
      this.employees = res;
      console.log(res);
    })

  
  }
}
