import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipientUpdateComponent } from './recipient-update.component';

describe('RecipientUpdateComponent', () => {
  let component: RecipientUpdateComponent;
  let fixture: ComponentFixture<RecipientUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipientUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipientUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
