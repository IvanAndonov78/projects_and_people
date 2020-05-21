import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeJobAreaComponent } from './employee-job-area.component';

describe('EmployeeJobAreaComponent', () => {
  let component: EmployeeJobAreaComponent;
  let fixture: ComponentFixture<EmployeeJobAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeJobAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeJobAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
