import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreateEmployeeComponent } from './success-create-employee.component';

describe('SuccessCreateEmployeeComponent', () => {
  let component: SuccessCreateEmployeeComponent;
  let fixture: ComponentFixture<SuccessCreateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCreateEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCreateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
