import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationRulesComponent } from './escalation-rules.component';

describe('EscalationRulesComponent', () => {
  let component: EscalationRulesComponent;
  let fixture: ComponentFixture<EscalationRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscalationRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalationRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
