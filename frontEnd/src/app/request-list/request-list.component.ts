import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent {

  isSubmitted = false;
  status: boolean = false;
  orders : any[] | undefined;

  constructor(public fb: FormBuilder,private svc : AppService) { }

  registrationForm = this.fb.group({
    OrderDate: [' ', [Validators.required]],
  });


  get MaterialName(){
    return this.registrationForm.get('OrderDate');
  }
  onSubmit(): void {
    console.log(this.registrationForm);
    this.isSubmitted = true;
      console.log("onSubmit");
      console.log(JSON.stringify(this.registrationForm.value));
    if(this.registrationForm.value){
      this.svc.getOrders().subscribe((res)=>{
        console.log(res);
        this.orders = res;
        this.status=true;
      })
    }
     
  }
}
