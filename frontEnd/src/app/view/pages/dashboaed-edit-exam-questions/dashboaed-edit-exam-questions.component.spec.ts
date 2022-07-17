import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboaedEditExamQuestionsComponent } from './dashboaed-edit-exam-questions.component';

describe('DashboaedEditExamQuestionsComponent', () => {
  let component: DashboaedEditExamQuestionsComponent;
  let fixture: ComponentFixture<DashboaedEditExamQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboaedEditExamQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboaedEditExamQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
