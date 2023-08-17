import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskDetailsComponent,
    TaskHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class StoreWorkerModule { }
