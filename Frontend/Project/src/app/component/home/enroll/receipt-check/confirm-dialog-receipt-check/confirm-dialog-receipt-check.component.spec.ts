import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogReceiptCheckComponent } from './confirm-dialog-receipt-check.component';

describe('ConfirmDialogReceiptCheckComponent', () => {
  let component: ConfirmDialogReceiptCheckComponent;
  let fixture: ComponentFixture<ConfirmDialogReceiptCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogReceiptCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogReceiptCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
