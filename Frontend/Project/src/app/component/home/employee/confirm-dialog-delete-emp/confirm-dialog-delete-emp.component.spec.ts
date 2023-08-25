import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDeleteEmpComponent } from './confirm-dialog-delete-emp.component';

describe('ConfirmDialogDeleteEmpComponent', () => {
  let component: ConfirmDialogDeleteEmpComponent;
  let fixture: ComponentFixture<ConfirmDialogDeleteEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogDeleteEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogDeleteEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
