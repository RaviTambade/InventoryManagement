import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Material } from 'src/app/Models/Material';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent {

  
  materials: Material[] = [];
  categories: string[] = [];
  data: Material[] = [];
  selectedCategory: string = "";

  constructor(private _materialsvc: MaterialService,private router:Router) {
  }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this._materialsvc.getAllMaterials().subscribe((response) => {
      this.data = response;
      this.materials = this.data.slice(0, 10);
      const id = this.materials[0].id;
      this._materialsvc.setSelectedMaterialId(id);

      console.log(response);
      this.data.forEach(item => {
        if (!this.categories.includes(item.type)) {
          this.categories.push(item.type);
        }
      });
    })
  }
  selectedMaterialId(id: number) {
    this._materialsvc.setSelectedMaterialId(id);
  }

  onSelectedCategory() {
    this._materialsvc.setSelectedMaterialId(0);
    const sortedMaterials = this.data.filter(m => m.type === this.selectedCategory)
    this.materials = sortedMaterials;
  }
  addNewMaterial(){
    this.router.navigate(["storeincharge/addMaterial"])
  }
}
