import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreWorkerDashboardComponent } from './store-worker-dashboard.component';

describe('StoreWorkerDashboardComponent', () => {
  let component: StoreWorkerDashboardComponent;
  let fixture: ComponentFixture<StoreWorkerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreWorkerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreWorkerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
