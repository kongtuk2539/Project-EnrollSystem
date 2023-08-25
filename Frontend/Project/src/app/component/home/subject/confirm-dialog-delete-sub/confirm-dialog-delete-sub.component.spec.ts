import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDeleteSubComponent } from './confirm-dialog-delete-sub.component';

describe('ConfirmDialogDeleteSubComponent', () => {
  let component: ConfirmDialogDeleteSubComponent;
  let fixture: ComponentFixture<ConfirmDialogDeleteSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogDeleteSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogDeleteSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
