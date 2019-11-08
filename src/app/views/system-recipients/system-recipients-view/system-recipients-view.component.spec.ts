import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRecipientsViewComponent } from './system-recipients-view.component';

describe('SystemRecipientsViewComponent', () => {
  let component: SystemRecipientsViewComponent;
  let fixture: ComponentFixture<SystemRecipientsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRecipientsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRecipientsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
