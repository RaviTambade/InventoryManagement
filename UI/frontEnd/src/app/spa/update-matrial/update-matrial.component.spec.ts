import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMatrialComponent } from './update-matrial.component';

describe('UpdateMatrialComponent', () => {
  let component: UpdateMatrialComponent;
  let fixture: ComponentFixture<UpdateMatrialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMatrialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMatrialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
