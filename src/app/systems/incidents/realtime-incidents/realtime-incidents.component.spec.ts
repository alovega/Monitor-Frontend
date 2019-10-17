import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeIncidentsComponent } from './realtime-incidents.component';

describe('RealtimeIncidentsComponent', () => {
  let component: RealtimeIncidentsComponent;
  let fixture: ComponentFixture<RealtimeIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealtimeIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealtimeIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
