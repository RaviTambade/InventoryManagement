import { Component } from '@angular/core';
import { TasksService } from '../../Services/tasks.service';
import { TaskDetails } from '../../Models/TaskDetails';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  
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
          this.svc.getTaskDetails(this.taskId).subscribe((res)=>{
          this.taskdetails=res;
          this.status=this.taskdetails[0].status;
          this.department=this.taskdetails[0].department;
        })
      }
  })
  }

  onPicked(){
    const orderStatus="Picked";
    this.svc.UpdateStatus(this.taskId,orderStatus).subscribe((res) => {
      if(res==true){
        this.status=orderStatus;
      }
    })
  }
  onDeliver(){
    const orderStatus="Delivered"; 
    this.svc.UpdateStatus(this.taskId,orderStatus).subscribe((res) => {
    })
    window.location.reload();
  }
}
