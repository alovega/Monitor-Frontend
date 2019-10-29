import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSystemRecipientsComponent } from './sms-system-recipients.component';

describe('SmsRecipientsComponent', () => {
  let component: SmsSystemRecipientsComponent;
  let fixture: ComponentFixture<SmsSystemRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSystemRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSystemRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
