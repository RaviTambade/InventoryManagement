import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MaterialService } from '../material.service';
import { Route, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { CartService } from '../cart.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  categories: any[];
  materials: any[];
  data: any[];
  newOrder: any;
  form: FormGroup;
  checked :any [];


  constructor(private fb: FormBuilder, private _materialsvc: MaterialService, private router: Router) {
    this.data = [];
    this.checked=[];
    this.newOrder = {
      "employeeid": 0,
      "materialid": 0,
      "type": '',
      "quantity": 0
    };
    this.categories = []
    this.materials = [{
      "id": 0,
      "imgUrl": '',
      'name': '',
      "quantity": 0,
      "type": '',
      "unitPrice": 0

    }];
    this.form = this.fb.group({
      category: this.fb.array([], [Validators.required])
    })
  }

  orderForm = this.fb.group({
    id: [0, [Validators.required]],
    name: [' ', [Validators.required]],
    type: [' ', [Validators.required]],
    quantity: [0, [Validators.required]],
    orderQuantity: [0, [Validators.required]],
  });


  ngOnInit(): void {
    this._materialsvc.getAllMaterials().subscribe((response) => {
      this.materials = response;
      this.data=response;
      console.log(response);
      

    })
    this._materialsvc.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
    })
  }

  onChange(res: string, isChecked: boolean) {
    const categoryFormArray = <FormArray>this.form.controls['category'];
    if (isChecked) {
      categoryFormArray.push(new FormControl(res));
      this.checked = categoryFormArray.value;
    } else {
      let index = categoryFormArray.controls.findIndex(x => x.value == res)
      categoryFormArray.removeAt(index);
      this.checked = categoryFormArray.value;

    }
    this.materials = this.data.filter( x => this.checked.includes(x.type));
    console.log(this.materials)
  }


  add(id: number) {
    this.router.navigate(['order', id]);
  }
  update(id: number) {
    this.router.navigate(['updatematerial', id]);
  }

}
