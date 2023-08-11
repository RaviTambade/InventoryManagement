import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsComponent } from './materials/materials.component';
import { SectionMaterialComponent } from './section-material/section-material.component';



@NgModule({
  declarations: [
    MaterialsComponent,
    SectionMaterialComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MaterialChartsModule { }
