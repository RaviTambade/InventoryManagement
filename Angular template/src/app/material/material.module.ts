import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialListComponent } from './material-list/material-list.component';
import { SearchMaterialComponent } from './search-material/search-material.component';
import { MaterialUpdateFormComponent } from './material-update-form/material-update-form.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from 'app/layouts/admin-layout/admin-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [MaterialListComponent, SearchMaterialComponent,MaterialUpdateFormComponent ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ]
})
export class MaterialModule { }
