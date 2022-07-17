import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewQuestionBankComponent } from './preview-question-bank.component';

describe('PreviewQuestionBankComponent', () => {
  let component: PreviewQuestionBankComponent;
  let fixture: ComponentFixture<PreviewQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewQuestionBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
