/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RecipientService } from './system-recipient.service';

describe('Service: Recipient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipientService]
    });
  });

  it('should ...', inject([RecipientService], (service: RecipientService) => {
    expect(service).toBeTruthy();
  }));
});
