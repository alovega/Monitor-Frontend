import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointStatusComponent } from './endpoint-status.component';

describe('EndpointStatusComponent', () => {
  let component: EndpointStatusComponent;
  let fixture: ComponentFixture<EndpointStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
