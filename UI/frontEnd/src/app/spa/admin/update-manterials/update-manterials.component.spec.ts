import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateManterialsComponent } from './update-manterials.component';

describe('UpdateManterialsComponent', () => {
  let component: UpdateManterialsComponent;
  let fixture: ComponentFixture<UpdateManterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateManterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateManterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
