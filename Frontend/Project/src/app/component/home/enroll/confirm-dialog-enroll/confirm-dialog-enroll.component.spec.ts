import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEnrollComponent } from './confirm-dialog-enroll.component';

describe('ConfirmDialogEnrollComponent', () => {
  let component: ConfirmDialogEnrollComponent;
  let fixture: ComponentFixture<ConfirmDialogEnrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEnrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEnrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
