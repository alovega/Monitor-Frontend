import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIncidentsComponent } from './search-incidents.component';

describe('SearchIncidentsComponent', () => {
  let component: SearchIncidentsComponent;
  let fixture: ComponentFixture<SearchIncidentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchIncidentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
