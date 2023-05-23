import { Component, OnInit } from '@angular/core';
import { Task } from '../Task';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-tasks-history',
  templateUrl: './tasks-history.component.html',
  styleUrls: ['./tasks-history.component.scss']
})
export class TasksHistoryComponent implements OnInit {
  empid:number=13 ;
  tasks : Task |undefined
  constructor(private svc:EmployeeServiceService){}

  ngOnInit(): void {
    
    this.getOrderhistory(this.empid);
  }

  getOrderhistory(empid:number){
    this.svc.getTasks(empid).subscribe((response)=>
    {
        this.tasks=response;
        console.log(this.tasks)
        console.log(response);
    })
  }
}
