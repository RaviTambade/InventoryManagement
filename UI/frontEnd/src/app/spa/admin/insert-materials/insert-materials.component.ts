import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialService } from '../../material.service';

@Component({
  selector: 'app-insert-materials',
  templateUrl: './insert-materials.component.html',
  styleUrls: ['./insert-materials.component.css']
})
export class InsertMaterialsComponent {
  materialForm: FormGroup;
  categories: any[]=[]; // Replace with your category type
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
      console.log(this.categories)
    });
  }


  onSubmit() {
    console.log("btn")
    if (this.materialForm.valid) {
      const formData = this.materialForm.value;
      console.log(formData)
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
