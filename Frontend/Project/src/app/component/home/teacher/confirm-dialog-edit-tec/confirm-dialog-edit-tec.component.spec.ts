import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogEditTecComponent } from './confirm-dialog-edit-tec.component';

describe('ConfirmDialogEditTecComponent', () => {
  let component: ConfirmDialogEditTecComponent;
  let fixture: ComponentFixture<ConfirmDialogEditTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogEditTecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogEditTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
