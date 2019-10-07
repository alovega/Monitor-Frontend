import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsRecipientsComponent } from './sms-recipients.component';

describe('SmsRecipientsComponent', () => {
  let component: SmsRecipientsComponent;
  let fixture: ComponentFixture<SmsRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
