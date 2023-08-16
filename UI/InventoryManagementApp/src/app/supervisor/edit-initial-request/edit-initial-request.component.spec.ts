import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInitialRequestComponent } from './edit-initial-request.component';

describe('EditInitialRequestComponent', () => {
  let component: EditInitialRequestComponent;
  let fixture: ComponentFixture<EditInitialRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInitialRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInitialRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
