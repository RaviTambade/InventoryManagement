import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskshistory',
  templateUrl: './taskshistory.component.html',
  styleUrls: ['./taskshistory.component.css']
})
export class TaskshistoryComponent {

  result:any;
  tasks:any[];
  empid:number=17;
  constructor(private _tastsvc:TasksService,private router: Router){
    this.tasks=[]
  }

  ngOnInit():void{

    this._tastsvc.getTasksHistory(this.empid).subscribe((res)=>{
      if(res){
        Date.parse(res.date)
        this.result = res;
        console.log(res);
        this.result?.reverse();
        this.tasks=this.result;
      }
    })
  }

  onView(taskid:any){
    this.router.navigate(['taskdetails', taskid]);
  }
}
