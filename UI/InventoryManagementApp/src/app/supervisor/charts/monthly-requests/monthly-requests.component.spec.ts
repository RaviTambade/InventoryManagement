import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRequestsComponent } from './monthly-requests.component';

describe('MonthlyRequestsComponent', () => {
  let component: MonthlyRequestsComponent;
  let fixture: ComponentFixture<MonthlyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
