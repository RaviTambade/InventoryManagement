import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInventoryComponent } from './update-inventory.component';

describe('UpdateInventoryComponent', () => {
  let component: UpdateInventoryComponent;
  let fixture: ComponentFixture<UpdateInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
