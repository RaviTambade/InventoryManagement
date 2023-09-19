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

  constructor(private svc:TasksService){}

  ngOnInit():void{
    this.getTasks(this.empId);
  }


  getTasks(empId:number){
    this.svc.getTasks(empId).subscribe((res)=>{
      this.tasks=res;
      console.log(res);
    })
  }

  selectedTask(id:number){
   this.svc.setSelectedRequestId(id);
   console.log(id);

  }
}
