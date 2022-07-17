import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashQuestionBankComponent } from './dash-question-bank.component';

describe('DashQuestionBankComponent', () => {
  let component: DashQuestionBankComponent;
  let fixture: ComponentFixture<DashQuestionBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashQuestionBankComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashQuestionBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
