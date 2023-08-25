import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptCheckComponent } from './receipt-check.component';

describe('ReceiptCheckComponent', () => {
  let component: ReceiptCheckComponent;
  let fixture: ComponentFixture<ReceiptCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceiptCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiptCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
