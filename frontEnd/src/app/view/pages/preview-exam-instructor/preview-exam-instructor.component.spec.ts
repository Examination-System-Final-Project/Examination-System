import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewExamInstructorComponent } from './preview-exam-instructor.component';

describe('PreviewExamInstructorComponent', () => {
  let component: PreviewExamInstructorComponent;
  let fixture: ComponentFixture<PreviewExamInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewExamInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewExamInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
