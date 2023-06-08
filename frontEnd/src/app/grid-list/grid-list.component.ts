import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.css']
})
export class GridListComponent {
  materialInfo:any[] |undefined;
  result:any[] |undefined;
  constructor(private svc:AppService){}
  
  ngOnInit(): void {
    this.svc.getMaterialInfo().subscribe((response)=>
    {
        this.result=response;
        this.materialInfo= this.result?.slice(0,10);
        console.log(this.materialInfo)
    })
  }

}
