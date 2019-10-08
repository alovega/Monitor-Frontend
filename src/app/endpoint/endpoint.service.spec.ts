/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EndpointService } from './endpoint.service';

describe('Service: Endpoint', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndpointService]
    });
  });

  it('should ...', inject([EndpointService], (service: EndpointService) => {
    expect(service).toBeTruthy();
  }));
});
