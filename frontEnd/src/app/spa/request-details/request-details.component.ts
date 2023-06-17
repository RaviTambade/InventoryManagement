import { Component } from '@angular/core';
import { MaterialService } from '../material.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent {

  carts:any[];
  id:any;
  reqid:number=0;
  subscription: Subscription|undefined;

  constructor(private svc:MaterialService,private _Activatedroute:ActivatedRoute){
    this.carts=[];
    
  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) =>
    {
      this.id=params.get('requestid');
      this.reqid=Number.parseInt(this.id);
      console.log(this.id);
    });
    this.svc.getRequestDetails(this.reqid).subscribe((res)=>{
      console.log(res);
      this.carts=res;
    })

}
}
