import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempratureChartComponent } from './temprature-chart.component';

describe('TempratureChartComponent', () => {
  let component: TempratureChartComponent;
  let fixture: ComponentFixture<TempratureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempratureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempratureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
