import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRecipientFormComponent } from './system-recipient-create.component';

describe('RecipientFormComponent', () => {
  let component: SystemRecipientFormComponent;
  let fixture: ComponentFixture<SystemRecipientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRecipientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRecipientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
