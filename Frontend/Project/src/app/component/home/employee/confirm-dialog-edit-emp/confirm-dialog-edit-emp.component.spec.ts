import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEditEmpComponent } from './confirm-dialog-edit-emp.component';

describe('ConfirmDialogEditEmpComponent', () => {
  let component: ConfirmDialogEditEmpComponent;
  let fixture: ComponentFixture<ConfirmDialogEditEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEditEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEditEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
