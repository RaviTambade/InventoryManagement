import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './components/tasks/tasks.component';
import { ListComponent } from './components/list/list.component';
import { DetailsComponent } from './components/details/details.component';


@NgModule({
  declarations: [
    TasksComponent,
    ListComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TasksComponent,
  ]
})
export class TasksModule { }
