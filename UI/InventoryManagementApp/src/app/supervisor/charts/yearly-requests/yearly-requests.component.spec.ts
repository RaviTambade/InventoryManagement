import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyRequestsComponent } from './yearly-requests.component';

describe('YearlyRequestsComponent', () => {
  let component: YearlyRequestsComponent;
  let fixture: ComponentFixture<YearlyRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlyRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
