import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupSystemComponent } from './setup-system.component';

describe('SetupSystemComponent', () => {
  let component: SetupSystemComponent;
  let fixture: ComponentFixture<SetupSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
