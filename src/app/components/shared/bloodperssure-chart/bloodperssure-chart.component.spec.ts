import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodperssureChartComponent } from './bloodperssure-chart.component';

describe('BloodperssureChartComponent', () => {
  let component: BloodperssureChartComponent;
  let fixture: ComponentFixture<BloodperssureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodperssureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodperssureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
