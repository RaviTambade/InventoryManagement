import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialUpdateFormComponent } from './material-update-form.component';

describe('MaterialUpdateFormComponent', () => {
  let component: MaterialUpdateFormComponent;
  let fixture: ComponentFixture<MaterialUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
