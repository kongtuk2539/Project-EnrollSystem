import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCancelComponent } from './confirm-dialog-cancel.component';

describe('ConfirmDialogCancelComponent', () => {
  let component: ConfirmDialogCancelComponent;
  let fixture: ComponentFixture<ConfirmDialogCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCancelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
