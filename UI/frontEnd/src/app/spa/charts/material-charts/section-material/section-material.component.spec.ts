import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionMaterialComponent } from './section-material.component';

describe('SectionMaterialComponent', () => {
  let component: SectionMaterialComponent;
  let fixture: ComponentFixture<SectionMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
