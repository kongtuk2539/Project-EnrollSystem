import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreateStudentComponent } from './success-create-student.component';

describe('SuccessCreateStudentComponent', () => {
  let component: SuccessCreateStudentComponent;
  let fixture: ComponentFixture<SuccessCreateStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCreateStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCreateStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
