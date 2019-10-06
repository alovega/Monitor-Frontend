/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetRecipientsService } from './get-recipients.service';

describe('Service: GetRecipients', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRecipientsService]
    });
  });

  it('should ...', inject([GetRecipientsService], (service: GetRecipientsService) => {
    expect(service).toBeTruthy();
  }));
});
