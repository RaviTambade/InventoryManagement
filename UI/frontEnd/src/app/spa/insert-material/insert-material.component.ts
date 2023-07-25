import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MaterialService } from '../material.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Material } from '../Material';

@Component({
  selector: 'app-insert-material',
  templateUrl: './insert-material.component.html',
  styleUrls: ['./insert-material.component.css']
})
export class InsertMaterialComponent {
  categories: any[];
  progress: number = 0;
  file: any;
  theCategory: any;
  path: string = '/assets/img/'
  message: string | undefined;

  @Output() public onUploadFinished = new EventEmitter();

  material: Material =
    {
      id:0,
      name: '',
      type: '',
      quantity: 0,
      unitPrice: 0,
      imgUrl: ''
    };;

  category = new FormControl(null, [Validators.required,]);

  constructor(private svc: MaterialService, private http: HttpClient) {
    this.categories = [];

  }

  ngOnInit(): void {

    //get material categories
    this.svc.getCategories().subscribe((res) => {
      console.log(res);
      this.categories = res;
      console.log(this.categories);
    })
  }

  //get file info
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    this.file = <File>files[0];
    // this.file=fileToUpload;
  }


  onSubmit(form: NgForm) {

    this.theCategory = this.category.value;
    //set material value
    this.material.name = form.value.name;
    this.material.quantity=form.value.quantity;
    this.material.unitPrice=form.value.unitprice;
    this.material.type = this.theCategory;
    this.material.imgUrl = this.path + this.file.name;

    //insert material in database
    this.svc.InsertMaterial(this.material).subscribe((res) => {
      console.log(res);
    });


    //save image in Rest API
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);

    this.http.post('http://localhost:5176/api/Materials/', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          console.log(event);
          if (event.type === HttpEventType.UploadProgress && event.total)
            this.progress = Math.round(100 * event.loaded / event.total);
          if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }


}




