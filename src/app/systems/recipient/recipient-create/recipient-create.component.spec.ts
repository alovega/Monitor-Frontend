import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientCreateComponent } from './recipient-create.component';

describe('RecipientCreateComponent', () => {
  let component: RecipientCreateComponent;
  let fixture: ComponentFixture<RecipientCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
