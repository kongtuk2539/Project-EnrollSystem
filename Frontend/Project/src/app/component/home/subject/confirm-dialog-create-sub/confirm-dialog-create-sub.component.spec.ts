import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCreateSubComponent } from './confirm-dialog-create-sub.component';

describe('ConfirmDialogCreateSubComponent', () => {
  let component: ConfirmDialogCreateSubComponent;
  let fixture: ComponentFixture<ConfirmDialogCreateSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCreateSubComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCreateSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
