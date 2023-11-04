import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from 'src/app/Services/material.service';

@Component({
  selector: 'app-add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {

  materialForm: FormGroup;
  categories: any[]=[]; 
  customCategoryDisabled = false;
  addCategory:boolean=false;
  selectCategory:boolean=true;
  constructor(private formBuilder: FormBuilder, private svc: MaterialService) {
    this.materialForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      quantity: ['', Validators.required],
      unitPrice: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Fetch categories from your category service
    this.svc.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }


  onSubmit() {
    if (this.materialForm.valid) {
      const filename = this.materialForm.value.imageUrl.split('\\').pop();
      this.materialForm.value.imageUrl = `./assets/img/${filename}`;
      const formData = this.materialForm.value;
      this.svc.InsertMaterial(formData).subscribe((res)=>{
        console.log(res)
      })
    }
  }
  addNewCategory(){
    this.addCategory=true;
    this.selectCategory=false;
  }

  addSelectedCategory(){
    this.addCategory=false;
    this.selectCategory=true;
  }
}
