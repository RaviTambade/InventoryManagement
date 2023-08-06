import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyReportComponent } from './weekly-report.component';

describe('WeeklyReportComponent', () => {
  let component: WeeklyReportComponent;
  let fixture: ComponentFixture<WeeklyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
