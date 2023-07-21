import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-taskshistory',
  templateUrl: './taskshistory.component.html',
  styleUrls: ['./taskshistory.component.css']
})
export class TaskshistoryComponent {

  result:any;
  task:Task | undefined;
  tasks:any[];
  tasksHistory:any[];
  empid:number=17;
  constructor(private _tastsvc:TasksService,private router: Router){
    this.tasks=[]
    this.tasksHistory=[];
  }

  ngOnInit():void{

    this._tastsvc.getTasks(this.empid).subscribe((res)=>{
      if(res){
        Date.parse(res.date)
        this.result = res;
        console.log(res);
        this.result?.reverse();
        this.task=this.result[0];
        this.tasks=this.result;
      }
    })

    this._tastsvc.getTasksHistory(this.empid).subscribe((res)=>{
      if(res){
        console.log(res);
        this.tasksHistory=res;
      }
    })
  }

  onView(taskid:any){
    this.router.navigate(['taskdetails', taskid]);
  }
}
