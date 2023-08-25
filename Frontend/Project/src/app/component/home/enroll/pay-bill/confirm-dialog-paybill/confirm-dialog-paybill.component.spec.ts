import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogPaybillComponent } from './confirm-dialog-paybill.component';

describe('ConfirmDialogPaybillComponent', () => {
  let component: ConfirmDialogPaybillComponent;
  let fixture: ComponentFixture<ConfirmDialogPaybillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogPaybillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogPaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
