import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InchargeDashboardComponent } from './incharge-dashboard.component';

describe('InchargeDashboardComponent', () => {
  let component: InchargeDashboardComponent;
  let fixture: ComponentFixture<InchargeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InchargeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InchargeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
