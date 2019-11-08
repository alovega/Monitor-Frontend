import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEndpointsComponent } from './add-endpoints.component';

describe('AddEndpointsComponent', () => {
  let component: AddEndpointsComponent;
  let fixture: ComponentFixture<AddEndpointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEndpointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEndpointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
