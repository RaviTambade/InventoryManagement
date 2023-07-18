import { Component } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  id: any;
  taskid: number = 0;
  tasks: Task[]
  constructor(private svc: TasksService, private _Activatedroute: ActivatedRoute) {
    this.tasks = [];
  }
  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('taskid');
      this.taskid = Number.parseInt(this.id);
    });
    this.svc.getTaskDetails(this.taskid).subscribe((res) => {
      console.log(res);
      this.tasks = res;
    })
  }

  onUpdate(id:number){
    console.log(id);
    this.svc.UpdateStatus(id).subscribe((res)=>{
      console.log(res);
    })
  }

}
