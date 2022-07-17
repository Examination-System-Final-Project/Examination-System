import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashQuestionsComponent } from './dash-questions.component';

describe('DashQuestionsComponent', () => {
  let component: DashQuestionsComponent;
  let fixture: ComponentFixture<DashQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
