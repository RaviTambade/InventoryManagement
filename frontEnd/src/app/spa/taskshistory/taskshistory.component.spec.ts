import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskshistoryComponent } from './taskshistory.component';

describe('TaskshistoryComponent', () => {
  let component: TaskshistoryComponent;
  let fixture: ComponentFixture<TaskshistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskshistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskshistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
