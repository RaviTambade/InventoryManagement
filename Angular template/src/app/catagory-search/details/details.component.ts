import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CatagoriesComponent } from '../catagories/catagories.component';
import { CatagoryService } from '../catagory.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  subscription: Subscription|undefined;
  message: string|undefined;
   
  materials : any [];

  constructor(private svc :CatagoryService) { }

  ngOnInit(): void {
    let theObservable:Observable<any> = this.svc.getData();
    this.subscription =theObservable.subscribe(
      msg => { 
        this.materials = msg;
        console.log(this.materials);
     })

}
}
