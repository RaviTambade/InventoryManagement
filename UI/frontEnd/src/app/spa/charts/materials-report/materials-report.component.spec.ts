import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsReportComponent } from './materials-report.component';

describe('MaterialsReportComponent', () => {
  let component: MaterialsReportComponent;
  let fixture: ComponentFixture<MaterialsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
