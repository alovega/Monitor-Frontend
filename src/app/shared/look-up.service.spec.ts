import { TestBed } from '@angular/core/testing';

import { LookUpService } from './look-up.service';

describe('LookUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LookUpService = TestBed.get(LookUpService);
    expect(service).toBeTruthy();
  });
});
