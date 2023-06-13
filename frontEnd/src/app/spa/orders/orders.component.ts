import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { MaterialService } from '../material.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  subscription: Subscription|undefined;
constructor(private svc:MaterialService){}

ngOnInit(): void {
  this.subscription = this.svc.getData().subscribe((response) =>{
    console.log(response.data);
    console.log(response);
  })
}
}
