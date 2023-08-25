import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDeleteStuComponent } from './confirm-dialog-delete-stu.component';

describe('ConfirmDialogDeleteStuComponent', () => {
  let component: ConfirmDialogDeleteStuComponent;
  let fixture: ComponentFixture<ConfirmDialogDeleteStuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogDeleteStuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogDeleteStuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
