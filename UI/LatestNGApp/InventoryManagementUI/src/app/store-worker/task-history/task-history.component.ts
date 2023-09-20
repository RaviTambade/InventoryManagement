import { Component,OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent implements OnInit{

  tasks:Task[]=[];
  empId:number=15;
  data:Task[]=[];
  pendingTaskcount:number |any;
  completedTaskcount:number |any;

  constructor(private svc:TasksService){}

  ngOnInit():void{
    this.getTasks(this.empId);
  }


  getTasks(empId:number){
    this.svc.getTasks(empId).subscribe((res)=>{
      this.tasks=res;
      this.data=res;
      console.log(res);
      this.completedTaskCount();
      this.pendingTaskCount();
    })
  }

  selectedTask(id:number){
   this.svc.setSelectedTaskId(id);
   console.log(id);

  }

  pendingTaskCount(){
    const pending = this.data.filter(u => u.status !== "Delivered").length;
    this.pendingTaskcount = pending;

  }
  completedTaskCount(){
    const completed = this.data.filter(u => u.status === "Delivered").length;
    this.completedTaskcount = completed;
    console.log(this.completedTaskCount);
  } 

  pendingTasks(){
    const pendingTask = this.data.filter(u => u.status !== "Delivered");
    this.tasks = pendingTask;
  }

  completedTasks(){
    const completedOrders = this.data.filter(u => u.status === "Delivered");
    this.tasks = completedOrders;   
  }  
}
