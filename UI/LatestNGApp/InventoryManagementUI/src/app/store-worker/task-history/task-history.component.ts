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
  empId:number=16;
  data:Task[]=[];
  pendingTaskcount:number |any;
  completedTaskcount:number |any;

  constructor(private svc:TasksService){}

  ngOnInit():void{
    this.getTasks() ;
  }

 getTasks(){
  this.svc.getTasks(this.empId).subscribe((res)=>{
    this.data=res;
    this.getTasksCount();
    this.pendingTasks();

  }) 
 }

 getTasksCount(){
  this.pendingTaskcount  = this.data.filter(u => u.status !== "Delivered").length;
  this.completedTaskcount = this.data.filter(u => u.status === "Delivered").length;
 }
  selectedTask(id:number){
   this.svc.setSelectedTaskId(id);
   console.log(id);

  }



  pendingTasks(){
    this.svc.setSelectedTaskId(0);
    const pendingTask = this.data.filter(u => u.status !== "Delivered");
    this.tasks = pendingTask;
    const id=this.tasks[0].id;
    this.svc.setSelectedTaskId(id);
  }

  completedTasks(){
    this.svc.setSelectedTaskId(0);
    const completedOrders = this.data.filter(u => u.status === "Delivered");
    this.tasks = completedOrders;   
  }  
}
