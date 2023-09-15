import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Material } from 'src/app/Models/Material';
import { MaterialService } from 'src/app/Services/material.service';


@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit {

  materials: Material[] = [];
  categories: string[] = [];
  data: Material[] = [];
  selectedCategory: string = "";

  constructor(private _materialsvc: MaterialService) {
  }

  ngOnInit(): void {
    this.getMaterials();
  }

  getMaterials() {
    this._materialsvc.getAllMaterials().subscribe((response) => {
      this.data = response;
      this.materials = this.data.slice(0, 10);
      console.log(response);
      this.materials.forEach(item => {
        if (!this.categories.includes(item.type)) {
          this.categories.push(item.type);
        }
      });
      console.log(this.categories);
    })
  }
  selectedMaterialId(id: number) {
    console.log(id);
    this._materialsvc.setSelectedMaterialId(id);
  }

  onSelectedCategory() {
    console.log(this.selectedCategory);
    const sortedMaterials = this.data.filter(m => m.type === this.selectedCategory)
    console.log(sortedMaterials);
    this.materials = sortedMaterials;

  }
}
