import { Component, OnInit } from '@angular/core';
import { Material } from 'src/app/Models/Material';
import { MaterialService } from 'src/app/Services/material.service';


@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit{

  materials:Material[]=[];
  categories:string[]=[];
  data:Material[]=[];

  constructor(private _materialsvc:MaterialService){
  }

  ngOnInit(): void {
    this._materialsvc.getAllMaterials().subscribe((response) => {
      this.materials = response;
      this.data=response;
      console.log(response);
      this.materials.forEach(item => { 
              if (!this.categories.includes(item.type)) {        
                 this.categories.push(item.type);       }    
                 });
                 console.log(this.categories);
      })
  }

  onSelectCategory(category:any){
    console.log(category);
    const sortedMaterials=this.data.filter(m=>m.type===category)
    console.log(sortedMaterials);
    this.materials=sortedMaterials;
  }

  selectedMaterialId(id:number){
    console.log(id);
   this._materialsvc.setSelectedMaterialId(id);
  }
}
