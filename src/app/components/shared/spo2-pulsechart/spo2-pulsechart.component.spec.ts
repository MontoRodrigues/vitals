import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spo2PulsechartComponent } from './spo2-pulsechart.component';

describe('Spo2PulsechartComponent', () => {
  let component: Spo2PulsechartComponent;
  let fixture: ComponentFixture<Spo2PulsechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Spo2PulsechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Spo2PulsechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
