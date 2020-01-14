import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRecipientsComponent } from './system-recipients.component';

describe('RecipientsComponent', () => {
  let component: SystemRecipientsComponent;
  let fixture: ComponentFixture<SystemRecipientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRecipientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRecipientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
