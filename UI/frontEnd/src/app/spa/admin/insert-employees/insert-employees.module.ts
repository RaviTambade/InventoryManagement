import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { ProfileInfoFormComponent } from './profile-info-form/profile-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PersonalInfoFormComponent,
    ProfileInfoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[PersonalInfoFormComponent,ProfileInfoFormComponent]
})
export class InsertEmployeesModule { }
