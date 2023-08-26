import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMaterialsComponent } from './insert-materials.component';

describe('InsertMaterialsComponent', () => {
  let component: InsertMaterialsComponent;
  let fixture: ComponentFixture<InsertMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertMaterialsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
