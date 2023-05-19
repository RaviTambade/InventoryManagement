import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreManagerDashboardComponent } from './store-manager-dashboard.component';

describe('StoreManagerDashboardComponent', () => {
  let component: StoreManagerDashboardComponent;
  let fixture: ComponentFixture<StoreManagerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreManagerDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
