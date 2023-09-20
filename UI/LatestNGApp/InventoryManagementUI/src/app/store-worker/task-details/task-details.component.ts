import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{

  constructor(private svc :TasksService){}

  taskdetails:Task |any;
  department:string="";
  taskId:number=0;
  
  ngOnInit(): void {
    this.svc.selectedTaskId$.subscribe((id) => {
      console.log(id);
      this.taskId=id;
      this.getTaskDetails(id);
  })
  }
  getTaskDetails(id:number){
    this.svc.getTaskDetails(id).subscribe((res)=>{
      this.taskdetails=res;
      this.department=this.taskdetails[0].department;
      console.log(this.taskdetails);
    })

  }
  onPicked(){
    this.svc.UpdateStatus(this.taskId).subscribe((res) => {
      console.log(res);
    })
    // window.location.reload();
  }
  onDeliver(){
    this.svc.Deliver(this.taskId).subscribe((res) => {
      console.log(res);
    })


  }
}
