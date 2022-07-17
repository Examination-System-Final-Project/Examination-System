import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamnieeReportComponent } from './examniee-report.component';

describe('ExamnieeReportComponent', () => {
  let component: ExamnieeReportComponent;
  let fixture: ComponentFixture<ExamnieeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamnieeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamnieeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
