import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyTasksComponent } from './yearly-tasks.component';

describe('YearlyTasksComponent', () => {
  let component: YearlyTasksComponent;
  let fixture: ComponentFixture<YearlyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
