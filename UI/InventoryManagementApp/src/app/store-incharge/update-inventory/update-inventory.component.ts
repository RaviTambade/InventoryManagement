import { Component } from '@angular/core';
import { MaterialService } from 'src/app/Services/material.service';
import { Material } from 'src/app/supervisor/Models/Material';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.css']
})
export class UpdateInventoryComponent {
  materials: Material[] = [];
  filteredMaterials: Material[] = [];
  uniqueMaterialTypes: string[] = []; 
  selectedTypes: { [key: string]: boolean } = {}; 

  selectedMaterial = new Material(
    0,    // id
    '',  // name
    '',  // type
    0,   // quantity
    0,    // unitPrice
    ''   // imageUrl
  );
  constructor(private svc: MaterialService) { }

  ngOnInit() {
    this.getMaterials();
    this.filterMaterials();
  }

  getMaterials() {
    this.svc.getAllMaterials().subscribe((res) => {
      this.materials = res;
      this.filteredMaterials = res;
      this.getCategories()
      
    });
  }
  getCategories(){
    const uniqueTypesSet = new Set<string>();
    this.materials.forEach(material => {
      uniqueTypesSet.add(material.type);
    });
    this.uniqueMaterialTypes = Array.from(uniqueTypesSet);
    console.log(this.uniqueMaterialTypes)
  }

  filterMaterials() {
    this.filteredMaterials = [];
    this.materials.forEach(material => {
      if (this.selectedTypes[material.type]) {
        this.filteredMaterials.push(material);
      }
    });
  }

  updateQuantity(material: any, quantity: any) {
    quantity = material.quantity + parseInt(quantity);
    console.log(material, quantity);
    this.svc.updateQuantity(material.id, quantity).subscribe((res) => {
      console.log(res);
      window.location.reload();
    });
  }
}
