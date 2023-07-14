import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-taskshistory',
  templateUrl: './taskshistory.component.html',
  styleUrls: ['./taskshistory.component.css']
})
export class TaskshistoryComponent {

  result:any;
  tasks:any[];
  empid:number=16;
  constructor(private _tastsvc:TasksService){
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

  onView(id:any){
    console.log(id);
    this._tastsvc.getTaskDetails(id).subscribe((res)=>{
      console.log(res);
    })
  }
}
