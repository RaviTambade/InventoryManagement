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
  material :string;
  constructor(private svc :CatagoryService) { }

  ngOnInit(): void {
    this.subscription = this.svc.getData().subscribe((response) =>{
      this.material = response.material;
      this.materials = response.data;
      console.log(this.material);
      console.log(response);
    })
}
}
