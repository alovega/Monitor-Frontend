import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemRecipientUpdateComponent } from './system-recipient-update.component';

describe('RecipientUpdateComponent', () => {
  let component: SystemRecipientUpdateComponent;
  let fixture: ComponentFixture<SystemRecipientUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemRecipientUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemRecipientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
