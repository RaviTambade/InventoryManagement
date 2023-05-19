import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorsDashboardComponent } from './supervisors-dashboard.component';

describe('SupervisorsDashboardComponent', () => {
  let component: SupervisorsDashboardComponent;
  let fixture: ComponentFixture<SupervisorsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
