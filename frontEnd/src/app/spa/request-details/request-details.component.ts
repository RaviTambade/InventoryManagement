import { Component } from '@angular/core';
import { MaterialService } from '../material.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  carts:any[];
  constructor(private svc:MaterialService){
    this.carts=[];
  }
  ngOnInit(): void {
    this.svc.getData().subscribe((res)=>{
      console.log(res.carts);
      this.carts=res.carts;
    })
  }

}
