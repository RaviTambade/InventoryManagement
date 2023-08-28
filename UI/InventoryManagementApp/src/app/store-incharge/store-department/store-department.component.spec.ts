import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDepartmentComponent } from './store-department.component';

describe('StoreDepartmentComponent', () => {
  let component: StoreDepartmentComponent;
  let fixture: ComponentFixture<StoreDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
