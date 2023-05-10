import { Component, OnInit } from '@angular/core';
import { Material } from 'app/Material';
import { MaterialService } from 'app/material.service';

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
