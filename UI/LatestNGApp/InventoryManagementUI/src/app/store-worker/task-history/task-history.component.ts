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
  employeeId:number=0;
  data:Task[]=[];
  pendingTaskcount:number |any;
  completedTaskcount:number |any;

  constructor(private svc:TasksService){
    this.getEmployeeId();
  }

  ngOnInit():void{
    this.getTasks();
    
  }
  getEmployeeId(){
    const id=localStorage.getItem("userId");
    if(id){
     this.employeeId=Number.parseInt(id);
    }
  }
 getTasks(){
  this.svc.getTasks(this.employeeId).subscribe((res)=>{
    this.data=res;
    this.getTasksCount();
    this.pendingTasks();

  }) 
 }

 getTasksCount(){
  this.pendingTaskcount  = this.data.filter(u => u.status !== "Delivered").length;
  this.completedTaskcount = this.data.filter(u => u.status === "Delivered").length;
 }

  pendingTasks(){
    this.tasks = this.data.filter(u => u.status !== "Delivered");
    const id=this.tasks[0].id;
    this.svc.setSelectedTaskId(id);
  }

  completedTasks(){
    this.tasks = this.data.filter(u => u.status === "Delivered");
    const id=this.tasks[0].id;
    this.svc.setSelectedTaskId(id); 
  } 
  
  selectedTask(id:number){
    this.svc.setSelectedTaskId(id);
   }
}
