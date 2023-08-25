import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogCreateTecComponent } from './confirm-dialog-create-tec.component';

describe('ConfirmDialogCreateTecComponent', () => {
  let component: ConfirmDialogCreateTecComponent;
  let fixture: ComponentFixture<ConfirmDialogCreateTecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogCreateTecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogCreateTecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
