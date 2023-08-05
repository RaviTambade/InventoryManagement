import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialChartComponent } from './material-chart.component';

describe('MaterialChartComponent', () => {
  let component: MaterialChartComponent;
  let fixture: ComponentFixture<MaterialChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
