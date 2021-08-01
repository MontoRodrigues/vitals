import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SugarChartComponent } from './sugar-chart.component';

describe('SugarChartComponent', () => {
  let component: SugarChartComponent;
  let fixture: ComponentFixture<SugarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SugarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SugarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
