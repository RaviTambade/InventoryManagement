import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialReportComponent } from './material-report.component';

describe('MaterialReportComponent', () => {
  let component: MaterialReportComponent;
  let fixture: ComponentFixture<MaterialReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
