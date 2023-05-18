import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './material-list/material-list.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MaterialListComponent,
    MaterialDetailsComponent,
    
  ],
  exports:[MaterialListComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MaterialTestModule { }
