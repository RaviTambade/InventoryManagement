import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateSearchComponent } from './date-search.component';

describe('DateSearchComponent', () => {
  let component: DateSearchComponent;
  let fixture: ComponentFixture<DateSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
