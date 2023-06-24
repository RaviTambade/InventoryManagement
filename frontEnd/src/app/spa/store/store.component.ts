import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MaterialService } from '../material.service';
import { Route, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';
import { CartService } from '../cart.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  categories:any[] ;
  materials: any[] ;
  data: any[];
  size: number = 0;
  material:any;
  cart:any[];
  newOrder:any;
  status:boolean=false;
  form: FormGroup;
  selectedItemsList:any [];
  checkedIDs = [];


  constructor( private fb: FormBuilder,private _materialsvc: MaterialService, private router:Router) {
    this.data = [];
    this.cart=[];
    this.newOrder={"employeeid" :0,
    "materialid":0,
    "type":'',
    "quantity":0};
    this.categories=[]
    this.selectedItemsList=[]
    this.materials=[];
    this.form = this.fb.group({
      category: this.fb.array([], [Validators.required])
    })
  }

  orderForm = this.fb.group({
    id : [0 , [Validators.required]],
    name : [ ' ', [Validators.required]],
    type : [ ' ', [Validators.required]],
    quantity : [ 0, [Validators.required]],
    orderQuantity: [ 0, [Validators.required]],
  });


  ngOnInit(): void {
    this._materialsvc.getAllMaterials().subscribe((response)=>{
      this.materials =response;
      console.log(response);
    })
    this._materialsvc.getCategories().subscribe((res)=>{
      console.log(res);
      this.categories=res;
    })
  }

  onChange(res:string, isChecked: boolean) {
    const emailFormArray = <FormArray>this.form.controls['category'];
    console.log(res);
    if(isChecked) {
      emailFormArray.push(new FormControl(res));
      console.log(emailFormArray)

    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == res)
      emailFormArray.removeAt(index);
    }

  }

  add(id:number){
    this.router.navigate(['order', id]);
  }
    

}
