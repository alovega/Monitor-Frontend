import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentEventsComponent } from './incident-events.component';

describe('IncidentEventsComponent', () => {
  let component: IncidentEventsComponent;
  let fixture: ComponentFixture<IncidentEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
