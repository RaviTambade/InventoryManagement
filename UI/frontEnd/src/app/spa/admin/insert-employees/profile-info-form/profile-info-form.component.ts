import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/Employee';
import { PersonalInfo } from 'src/app/PersonalInfo';

@Component({
  selector: 'profileform',
  templateUrl: './profile-info-form.component.html',
  styleUrls: ['./profile-info-form.component.css']
})
export class ProfileInfoFormComponent {
  defaultPassword:string='SVRP123'
  employee: Employee = {
    userId: 0,
    hireDate: new Date(),
    department: '',
    role: '',
    imgUrl: '',
  };
  deparments=["g550", "store", "HR"];
  roles  = [
    'Incharge',
    'Store Manager',
    'Supervisor',
    'Store Worker',     
];
personalInfo:any;
path: string = '/assets/img/'
  hiredate=new Date();
  progress: number = 0;
  file: any;
  message: string | undefined;

  @Output() public onUploadFinished = new EventEmitter();


  constructor(public fb : FormBuilder,private http: HttpClient) { }

  ngForm = this.fb.group({
    roleName : [ ' ', [Validators.required]],
    department : [ ' ', [Validators.required]],

  });

  changeRole(e: any){
    this.roleName?.setValue(e.target.value,{
      onlySelf : true,
    });
  }
  get roleName(){
    return this.ngForm.get('roleName');
  }

  changeDepartment(e: any){
    this.department?.setValue(e.target.value,{
      onlySelf : true,
    });
  }
  get department(){
    return this.ngForm.get('department');
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    this.file = <File>files[0];
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    console.log(formData)
    // this.file=fileToUpload;
  }

  submitForm() {
    console.log(this.ngForm);
  
    if(this.ngForm.value.department!=null && this.ngForm.value.roleName!=null){
      this.employee.department=this.ngForm.value.department;
      this.employee.role=this.ngForm.value.roleName
    }
   
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.employee.imgUrl= this.path + this.file.name;
    this.personalInfo= localStorage.getItem("personalInfo")
    console.log(this.personalInfo);
    
    // this.http.post('http://localhost:5176/api/Materials/', formData, { reportProgress: true, observe: 'events' })
    //   .subscribe({
    //     next: (event) => {
    //       console.log(event);
    //       if (event.type === HttpEventType.UploadProgress && event.total)
    //         this.progress = Math.round(100 * event.loaded / event.total);
    //       if (event.type === HttpEventType.Response) {
    //         this.message = 'Upload success.';
    //         this.onUploadFinished.emit(event.body);
    //       }
    //     },
    //     error: (err: HttpErrorResponse) => console.log(err)
    //   });
    // Add your logic to submit the form data to a server or perform other actions
  }

  

}
