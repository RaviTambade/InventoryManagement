import { Component, OnInit } from '@angular/core';
import { MaterialService } from 'app/material.service';
import { Observable, Subscription } from 'rxjs';
import { MaterialTestService } from '../material-test.service';

@Component({
  selector: 'app-material-details',
  templateUrl: './material-details.component.html',
  styleUrls: ['./material-details.component.scss']
})
export class MaterialDetailsComponent implements OnInit {

  subscription: Subscription|undefined;
  message: string|undefined;
   
  materials : any [];
 

  constructor(private svc : MaterialTestService) { }

  ngOnInit(): void {
    let theObservable:Observable<any> = this.svc.getData();
    this.subscription =theObservable.subscribe(
      msg => { 
        this.materials = msg;
        console.log(this.materials);
        //console.log(this.message.cityName);
        console.log(" Detail Component :event handler is called")   
     })

}
}
