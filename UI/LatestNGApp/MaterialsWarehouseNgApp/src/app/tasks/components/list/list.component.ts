import { Component } from '@angular/core';
import { Task } from '../../Models/Task';
import { TasksService } from '../../Services/tasks.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  tasks:Task[]=[];
  employeeId:number=0;
  data:Task[]=[];
  pendingTaskcount:number |any;
  completedTaskcount:number |any;

  constructor(private svc:TasksService){
    const id=localStorage.getItem("userId");
    if(id){
     this.employeeId=Number.parseInt(id);
    }
  }

  ngOnInit():void{
    this.svc.getTasks(this.employeeId).subscribe((res)=>{
      this.data=res;
      //this.getTasksCount();
      this.pendingTaskcount  = this.data.filter(u => u.status !== "Delivered").length;
      this.completedTaskcount = this.data.filter(u => u.status === "Delivered").length;
      this.onPendingTasks();
    }) 
  }

  onPendingTasks(){
    this.tasks = this.data.filter(u => u.status !== "Delivered");
    const id=this.tasks[0].id;
    this.svc.setSelectedTaskId(id);
  }

  onCompletedTasks(){
    this.tasks = this.data.filter(u => u.status === "Delivered");
    const id=this.tasks[0].id;
    this.svc.setSelectedTaskId(id); 
  } 
  
  onSelectedTask(id:number){
    this.svc.setSelectedTaskId(id);
   }
}
