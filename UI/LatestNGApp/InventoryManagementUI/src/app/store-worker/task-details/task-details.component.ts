import { Component, Input, OnInit } from '@angular/core';
import { TaskDetails } from 'src/app/Models/TaskDetails';
import { TasksService } from 'src/app/Services/tasks.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit{

  constructor(private svc :TasksService){}
  
  taskdetails:TaskDetails[]=[];
  department:string="";
  taskId:number=0;
  changeStatus:boolean=true;
  status:string="";
  
  ngOnInit(): void {
    this.svc.selectedTaskId$.subscribe((id) => {
      this.taskId=id;
      if(this.taskId!==0 && this.taskId!==undefined && this.taskId!==null){
        this.getTaskDetails();
      }
  })
  }
  getTaskDetails(){
    this.svc.getTaskDetails(this.taskId).subscribe((res)=>{
      this.taskdetails=res;
      console.log(res);
      this.status=this.taskdetails[0].status;
      this.department=this.taskdetails[0].department;
    })

  }
  onPicked(){
    const orderStatus="Picked";
    this.svc.UpdateStatus(this.taskId,orderStatus).subscribe((res) => {
      console.log(res);
      if(res==true){
        this.status=orderStatus;
      }
    })
  }
  onDeliver(){
    const orderStatus="Delivered"; 
    this.svc.UpdateStatus(this.taskId,orderStatus).subscribe((res) => {
      console.log(res);
    })
    window.location.reload();
  }
}
