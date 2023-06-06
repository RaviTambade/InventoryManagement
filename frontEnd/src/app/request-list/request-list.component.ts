import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent {

  orders : any[] | undefined;
  constructor(public fb: FormBuilder,private svc : AppService) { }

  listForm = this.fb.group({
    OrderDate: [' ', [Validators.required]],
  });

  onSubmit(): void {
    console.log(this.listForm);
    if(this.listForm.value.OrderDate =="Today's Orders"){
      this.svc.getOrders().subscribe((res)=>{
        this.orders = res;
      })
    }    
  }

}
