import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEditStuComponent } from './confirm-dialog-edit-stu.component';

describe('ConfirmDialogEditStuComponent', () => {
  let component: ConfirmDialogEditStuComponent;
  let fixture: ComponentFixture<ConfirmDialogEditStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEditStuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEditStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
