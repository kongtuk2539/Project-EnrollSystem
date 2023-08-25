import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollInformationComponent } from './enroll-information.component';

describe('EnrollInformationComponent', () => {
  let component: EnrollInformationComponent;
  let fixture: ComponentFixture<EnrollInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
