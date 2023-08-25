import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollDataComponent } from './enroll-data.component';

describe('EnrollDataComponent', () => {
  let component: EnrollDataComponent;
  let fixture: ComponentFixture<EnrollDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
