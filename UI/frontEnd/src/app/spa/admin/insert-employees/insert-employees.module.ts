import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalInfoFormComponent } from './personal-info-form/personal-info-form.component';
import { ProfileInfoFormComponent } from './profile-info-form/profile-info-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes=
  [   
      {path:'profileform',component:ProfileInfoFormComponent},
    ];
@NgModule({
  declarations: [
    PersonalInfoFormComponent,
    ProfileInfoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

  ],
  exports:[PersonalInfoFormComponent,ProfileInfoFormComponent]
})
export class InsertEmployeesModule { }
