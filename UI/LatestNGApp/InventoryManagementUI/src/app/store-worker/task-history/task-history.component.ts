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
  empId:number=35;
  data:Task[]=[];
  pendingTaskcount:number |any;
  completedTaskcount:number |any;

  constructor(private svc:TasksService){}

  ngOnInit():void{
    this.svc.getTasks(this.empId).subscribe((res)=>{
      this.data=res;
      this.pendingTasks();
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
    this.svc.setSelectedTaskId(0);
    const pendingTask = this.data.filter(u => u.status !== "Delivered");
    this.tasks = pendingTask;
  }

  completedTasks(){
    this.svc.setSelectedTaskId(0);
    const completedOrders = this.data.filter(u => u.status === "Delivered");
    this.tasks = completedOrders;   
  }  
}
