import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDepartmentComponent } from './switch-department.component';

describe('SwitchDepartmentComponent', () => {
  let component: SwitchDepartmentComponent;
  let fixture: ComponentFixture<SwitchDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
