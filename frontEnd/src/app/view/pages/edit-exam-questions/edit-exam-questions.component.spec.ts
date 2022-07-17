import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExamQuestionsComponent } from './edit-exam-questions.component';

describe('EditExamQuestionsComponent', () => {
  let component: EditExamQuestionsComponent;
  let fixture: ComponentFixture<EditExamQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditExamQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
