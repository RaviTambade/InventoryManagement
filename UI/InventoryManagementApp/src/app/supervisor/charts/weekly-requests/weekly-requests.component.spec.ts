import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyRequestsComponent } from './weekly-requests.component';

describe('WeeklyRequestsComponent', () => {
  let component: WeeklyRequestsComponent;
  let fixture: ComponentFixture<WeeklyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
