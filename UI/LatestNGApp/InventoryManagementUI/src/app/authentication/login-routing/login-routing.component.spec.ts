import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRoutingComponent } from './login-routing.component';

describe('LoginRoutingComponent', () => {
  let component: LoginRoutingComponent;
  let fixture: ComponentFixture<LoginRoutingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginRoutingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRoutingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
