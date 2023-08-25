import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCreateStuComponent } from './confirm-dialog-create-stu.component';

describe('ConfirmDialogCreateStuComponent', () => {
  let component: ConfirmDialogCreateStuComponent;
  let fixture: ComponentFixture<ConfirmDialogCreateStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCreateStuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCreateStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
