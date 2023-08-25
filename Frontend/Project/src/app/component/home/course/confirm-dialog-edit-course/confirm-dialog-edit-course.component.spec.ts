import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEditCourseComponent } from './confirm-dialog-edit-course.component';

describe('ConfirmDialogEditCourseComponent', () => {
  let component: ConfirmDialogEditCourseComponent;
  let fixture: ComponentFixture<ConfirmDialogEditCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEditCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEditCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
