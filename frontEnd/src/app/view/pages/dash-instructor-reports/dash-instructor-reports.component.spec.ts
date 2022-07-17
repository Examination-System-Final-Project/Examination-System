import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashInstructorReportsComponent } from './dash-instructor-reports.component';

describe('DashInstructorReportsComponent', () => {
  let component: DashInstructorReportsComponent;
  let fixture: ComponentFixture<DashInstructorReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashInstructorReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashInstructorReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
