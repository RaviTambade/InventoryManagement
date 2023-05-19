import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../material.service';
import { Material } from '../Material';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {

  materials:Material [] |undefined
  constructor(private svc:MaterialService) { }

  ngOnInit(): void {
    this.svc.getAllMaterials().subscribe((response)=>{
      this.materials =response;
      console.log(response);
      console.log(this.materials);
    })
  }

}
