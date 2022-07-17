import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPreviewExamInstructorComponent } from './dash-preview-exam-instructor.component';

describe('DashPreviewExamInstructorComponent', () => {
  let component: DashPreviewExamInstructorComponent;
  let fixture: ComponentFixture<DashPreviewExamInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPreviewExamInstructorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPreviewExamInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
