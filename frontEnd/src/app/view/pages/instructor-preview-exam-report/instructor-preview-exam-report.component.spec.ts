import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorPreviewExamReportComponent } from './instructor-preview-exam-report.component';

describe('InstructorPreviewExamReportComponent', () => {
  let component: InstructorPreviewExamReportComponent;
  let fixture: ComponentFixture<InstructorPreviewExamReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorPreviewExamReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorPreviewExamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
