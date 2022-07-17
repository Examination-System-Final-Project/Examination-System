import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrueFalseFormComponent } from './true-false-form.component';

describe('TrueFalseFormComponent', () => {
  let component: TrueFalseFormComponent;
  let fixture: ComponentFixture<TrueFalseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrueFalseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrueFalseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
