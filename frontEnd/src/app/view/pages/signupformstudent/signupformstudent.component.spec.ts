import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupformstudentComponent } from './signupformstudent.component';

describe('SignupformstudentComponent', () => {
  let component: SignupformstudentComponent;
  let fixture: ComponentFixture<SignupformstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupformstudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupformstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
