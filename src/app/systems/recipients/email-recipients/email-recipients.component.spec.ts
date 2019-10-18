import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRecipientsComponent } from './email-recipients.component';

describe('EmailRecipientsComponent', () => {
  let component: EmailRecipientsComponent;
  let fixture: ComponentFixture<EmailRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
