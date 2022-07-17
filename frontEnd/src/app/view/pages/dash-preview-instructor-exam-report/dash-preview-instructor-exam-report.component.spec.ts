import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPreviewInstructorExamReportComponent } from './dash-preview-instructor-exam-report.component';

describe('DashPreviewInstructorExamReportComponent', () => {
  let component: DashPreviewInstructorExamReportComponent;
  let fixture: ComponentFixture<DashPreviewInstructorExamReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPreviewInstructorExamReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPreviewInstructorExamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
