import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrueFalseFormComponent } from './edit-true-false-form.component';

describe('EditTrueFalseFormComponent', () => {
  let component: EditTrueFalseFormComponent;
  let fixture: ComponentFixture<EditTrueFalseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrueFalseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrueFalseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
