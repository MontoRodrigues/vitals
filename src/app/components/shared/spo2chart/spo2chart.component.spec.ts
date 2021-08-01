import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spo2chartComponent } from './spo2chart.component';

describe('Spo2chartComponent', () => {
  let component: Spo2chartComponent;
  let fixture: ComponentFixture<Spo2chartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Spo2chartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Spo2chartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
