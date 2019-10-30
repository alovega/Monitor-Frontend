import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSystemRecipientsComponent } from './email-system-recipients.component';

describe('EmailRecipientsComponent', () => {
  let component: EmailSystemRecipientsComponent;
  let fixture: ComponentFixture<EmailSystemRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSystemRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSystemRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
