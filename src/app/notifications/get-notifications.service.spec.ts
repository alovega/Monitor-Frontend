/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetNotificationsService } from './get-notifications.service';

describe('Service: GetNotifications', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetNotificationsService]
    });
  });

  it('should ...', inject([GetNotificationsService], (service: GetNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
