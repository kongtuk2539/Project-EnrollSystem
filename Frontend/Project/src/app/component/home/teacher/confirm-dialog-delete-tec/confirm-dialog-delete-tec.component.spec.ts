import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDeleteTecComponent } from './confirm-dialog-delete-tec.component';

describe('ConfirmDialogDeleteTecComponent', () => {
  let component: ConfirmDialogDeleteTecComponent;
  let fixture: ComponentFixture<ConfirmDialogDeleteTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogDeleteTecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogDeleteTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
