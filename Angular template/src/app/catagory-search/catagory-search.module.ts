import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatagoriesComponent } from './catagories/catagories.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CatagoriesComponent,
    DetailsComponent
  ],
  exports:[CatagoriesComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CatagorySearchModule { }
