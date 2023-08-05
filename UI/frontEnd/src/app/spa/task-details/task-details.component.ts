import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  showPopup: boolean = false;
  inputValue: string = '';

  id: any;
  taskid: number = 0;
  picked:boolean=false;
  deliver:boolean=false;

  tasks: Task[]
  department:any;
  constructor(private _location:Location,private svc: TasksService, private _Activatedroute: ActivatedRoute) {
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
      this.department = this.tasks[0].department;
      let result=this.tasks[0].status;
      console.log(result)
      if(result=="Picked"){
        console.log("in IF");
        this.picked=true
      }
      if(result=="Delivered"){
        console.log("in de");
        this.deliver=true
      }
      console.log(this.picked);
      console.log(this.deliver);
    })
  }

  onUpdate(){
    this.svc.UpdateStatus(this.taskid).subscribe((res)=>{
      console.log(res);
    })
    window.location.reload();
  }
  onDeliver(){
    this.showPopup = true;

    // this.svc.Deliver(this.taskid).subscribe((res)=>{
    //   console.log(res);
    // })
    // this._location.back();
  }
  onBack(){
    this._location.back();
  }



  closePopup() {
    this.showPopup = false;
  }

  onPopupOk() {
    console.log('User input:', this.inputValue);
    // Do something with the user input (e.g., save to a variable, trigger an action, etc.).
    this.closePopup();
  }

  onPopupCancel() {
    this.closePopup();
  }
}
