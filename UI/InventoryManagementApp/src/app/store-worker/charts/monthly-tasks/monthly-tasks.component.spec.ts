import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyTasksComponent } from './monthly-tasks.component';

describe('MonthlyTasksComponent', () => {
  let component: MonthlyTasksComponent;
  let fixture: ComponentFixture<MonthlyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
