import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfleComponent } from './my-profle.component';

describe('MyProfleComponent', () => {
  let component: MyProfleComponent;
  let fixture: ComponentFixture<MyProfleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
