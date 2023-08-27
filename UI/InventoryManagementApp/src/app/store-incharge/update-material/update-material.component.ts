import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialService } from 'src/app/Services/material.service';
import { Material } from 'src/app/supervisor/Models/Material';

@Component({
  selector: 'app-update-material',
  templateUrl: './update-material.component.html',
  styleUrls: ['./update-material.component.css']
})
export class UpdateMaterialComponent {
  materialForm: FormGroup;
  image:string='';
  categories: string[] = [];

  constructor(private formBuilder: FormBuilder,private svc:MaterialService) {
    this.materialForm = this.formBuilder.group({
      name: [''],
      type: [''],
      unitPrice: [0],
      imgUrl: ['']
    });
  }
  
  ngOnInit() {
    this.svc.getCategories().subscribe((res)=>{
      console.log(res)
      this.categories=res;
    })
    this.svc.getById(2).subscribe((res)=>{
      console.log(res);
      this.materialForm.patchValue(res);
      this.image= this.materialForm.value.imgUrl
    })
  }
  
  onSubmit() {
    const updatedMaterial: Material = this.materialForm.value;
    console.log(updatedMaterial)
    this.svc.updateMaterial(2,updatedMaterial).subscribe((res)=>{
      console.log(res)
    })
  }
}
