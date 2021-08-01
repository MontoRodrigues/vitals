import { TestBed } from '@angular/core/testing';

import { ServicespatientService } from './servicespatient.service';

describe('ServicespatientService', () => {
  let service: ServicespatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicespatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
