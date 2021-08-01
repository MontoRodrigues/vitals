import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodperssurePulseChartComponent } from './bloodperssure-pulse-chart.component';

describe('BloodperssurePulseChartComponent', () => {
  let component: BloodperssurePulseChartComponent;
  let fixture: ComponentFixture<BloodperssurePulseChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodperssurePulseChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodperssurePulseChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
