import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCreateTeacherComponent } from './success-create-teacher.component';

describe('SuccessCreateTeacherComponent', () => {
  let component: SuccessCreateTeacherComponent;
  let fixture: ComponentFixture<SuccessCreateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCreateTeacherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessCreateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
