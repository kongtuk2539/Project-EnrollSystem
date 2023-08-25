import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCreateEmpComponent } from './confirm-dialog-create-emp.component';

describe('ConfirmDialogCreateEmpComponent', () => {
  let component: ConfirmDialogCreateEmpComponent;
  let fixture: ComponentFixture<ConfirmDialogCreateEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCreateEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCreateEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
