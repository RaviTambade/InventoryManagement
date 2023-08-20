import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyTasksComponent } from './weekly-tasks.component';

describe('WeeklyTasksComponent', () => {
  let component: WeeklyTasksComponent;
  let fixture: ComponentFixture<WeeklyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
