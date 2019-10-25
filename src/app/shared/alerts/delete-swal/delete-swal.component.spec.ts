import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSwalComponent } from './delete-swal.component';

describe('DeleteSwalComponent', () => {
  let component: DeleteSwalComponent;
  let fixture: ComponentFixture<DeleteSwalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSwalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSwalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
