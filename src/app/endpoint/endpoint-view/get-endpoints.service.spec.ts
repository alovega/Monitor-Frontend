/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetEndpointsService } from './get-endpoints.service';

describe('Service: GetEndpoints', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetEndpointsService]
    });
  });

  it('should ...', inject([GetEndpointsService], (service: GetEndpointsService) => {
    expect(service).toBeTruthy();
  }));
});
