import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPreviewQuestionBankComponent } from './dash-preview-question-bank.component';

describe('DashPreviewQuestionBankComponent', () => {
  let component: DashPreviewQuestionBankComponent;
  let fixture: ComponentFixture<DashPreviewQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPreviewQuestionBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashPreviewQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
