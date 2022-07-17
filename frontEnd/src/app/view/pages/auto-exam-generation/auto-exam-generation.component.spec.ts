import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoExamGenerationComponent } from './auto-exam-generation.component';

describe('AutoExamGenerationComponent', () => {
  let component: AutoExamGenerationComponent;
  let fixture: ComponentFixture<AutoExamGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoExamGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoExamGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
