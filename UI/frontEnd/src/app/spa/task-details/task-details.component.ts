import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from 'src/app/Task';
import { AuthService } from '../auth.service';
import { VerifyCredentials } from '../VerifyCredentials';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  showPopup: boolean = false;
  showPopup2: boolean = false;
  inputValue: string = '';
  orderImg:string='/assets/img/box.png'
  credential: VerifyCredentials = {
    "id": 0,
    "password": ""
  }
  id: any;
  taskid: number = 0;
  picked: boolean = false;
  deliver: boolean = false;

  tasks: Task[]
  department: any;
  constructor(private router: Router,private _location: Location, private authsvc: AuthService, private svc: TasksService, private _Activatedroute: ActivatedRoute) {
    this.tasks = [];
  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('taskid');
      this.taskid = Number.parseInt(this.id);
    });
    this.svc.getTaskDetails(this.taskid).subscribe((res) => {
      console.log(res);
      this.tasks = res;
      this.credential.id = this.tasks[0].supervisorId
      this.department = this.tasks[0].department;
      let result = this.tasks[0].status;
      console.log(result)
      if (result == "Picked") {
        this.picked = true
      }
      if (result == "Delivered") {
        this.deliver = true
      }
      console.log(this.picked);
      console.log(this.deliver);
    })
    this.authsvc.verify(this.credential).subscribe((res) => {
      console.log(res);
    })
  }

  onPicked() {
    this.showPopup2 = true;
    // this.svc.UpdateStatus(this.taskid).subscribe((res) => {
    //   console.log(res);
    // })
    // window.location.reload();
  }
  onDeliver() {
    this.showPopup = true;
  }
  onBack() {
    this._location.back();
  }



  closePopup() {
    this.showPopup = false;
  }

  onPopupOkForPicked() {
    console.log('User input:', this.inputValue);
    this.credential.password = this.inputValue;
    console.log(this.credential)
    this.authsvc.verify(this.credential).subscribe((res) => {
      console.log(res);
      //if true means employees password is varified successfully
      if (res == true) {
        this.svc.Deliver(this.taskid).subscribe((res) => {
          console.log(res);
        })
        this.router.navigate(['taskshistory']);

      }
      else{
        this.inputValue='';
        alert("Incorrect Password!");
      }
    })
    // Do something with the user input (e.g., save to a variable, trigger an action, etc.).
    this.closePopup();
  }

  onPopupCancelForPicked() {
    this.closePopup();
  }

  onPopupOk() {
    console.log('User input:', this.inputValue);
    this.credential.password = this.inputValue;
    console.log(this.credential)
    this.authsvc.verify(this.credential).subscribe((res) => {
      console.log(res);
      //if true means employees password is varified successfully
      if (res == true) {
        this.svc.Deliver(this.taskid).subscribe((res) => {
          console.log(res);
        })
        this.router.navigate(['taskshistory']);

      }
      else{
        this.inputValue='';
        alert("Incorrect Password!");
      }
    })
    // Do something with the user input (e.g., save to a variable, trigger an action, etc.).
    this.closePopup();
  }

  onPopupCancel() {
    this.closePopup();
  }
}
