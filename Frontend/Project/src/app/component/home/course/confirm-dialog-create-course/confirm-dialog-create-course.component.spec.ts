import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCreateCourseComponent } from './confirm-dialog-create-course.component';

describe('ConfirmDialogCreateCourseComponent', () => {
  let component: ConfirmDialogCreateCourseComponent;
  let fixture: ComponentFixture<ConfirmDialogCreateCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCreateCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCreateCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
