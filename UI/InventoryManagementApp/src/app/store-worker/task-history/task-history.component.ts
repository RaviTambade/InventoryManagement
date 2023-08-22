import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../Services/task.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.css']
})
export class TaskHistoryComponent {
  result:any;
  task:any | undefined;
  tasks:any[];
  tasksHistory:any[];
  empid:number=15;
  constructor(private _tastsvc:TaskService,private router: Router){
    this.tasks=[]
    this.tasksHistory=[];
  }

  ngOnInit():void{

    this._tastsvc.getTasks(this.empid).subscribe((res)=>{
        console.log(res);
        this.task=res;
    })

    this._tastsvc.getTasksHistory(this.empid).subscribe((res)=>{
      if(res){
        console.log(res);
        this.tasksHistory=res;
      }
    })
  }

  onView(taskid:any){
    this.router.navigate(['/storeworker/taskdetails', taskid]);
  }
}
