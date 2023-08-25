import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreInchargeDashboardComponent } from './store-incharge-dashboard.component';

describe('StoreInchargeDashboardComponent', () => {
  let component: StoreInchargeDashboardComponent;
  let fixture: ComponentFixture<StoreInchargeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreInchargeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreInchargeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
