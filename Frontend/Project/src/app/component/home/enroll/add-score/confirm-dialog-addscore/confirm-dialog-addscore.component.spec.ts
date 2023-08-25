import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogAddscoreComponent } from './confirm-dialog-addscore.component';

describe('ConfirmDialogAddscoreComponent', () => {
  let component: ConfirmDialogAddscoreComponent;
  let fixture: ComponentFixture<ConfirmDialogAddscoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogAddscoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogAddscoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
