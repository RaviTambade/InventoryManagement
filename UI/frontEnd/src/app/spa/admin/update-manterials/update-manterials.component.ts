import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialService } from '../../material.service';
import { Material } from '../../Material';

@Component({
  selector: 'update-manterials',
  templateUrl: './update-manterials.component.html',
  styleUrls: ['./update-manterials.component.css']
})
export class UpdateManterialsComponent {
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
