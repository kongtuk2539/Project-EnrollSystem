import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEditSubComponent } from './confirm-dialog-edit-sub.component';

describe('ConfirmDialogEditSubComponent', () => {
  let component: ConfirmDialogEditSubComponent;
  let fixture: ComponentFixture<ConfirmDialogEditSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEditSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEditSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
