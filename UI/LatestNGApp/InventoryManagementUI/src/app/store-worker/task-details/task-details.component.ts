import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/Models/Task';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{

  constructor(private svc :TasksService){}

  taskdetails:Task |any;
  
  ngOnInit(): void {
    this.svc.selectedTaskId$.subscribe((id) => {
      console.log(id)
  })
  }
}
