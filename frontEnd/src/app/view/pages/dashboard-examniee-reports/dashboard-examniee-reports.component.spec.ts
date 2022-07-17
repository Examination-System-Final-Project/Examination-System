import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExamnieeReportsComponent } from './dashboard-examniee-reports.component';

describe('DashboardExamnieeReportsComponent', () => {
  let component: DashboardExamnieeReportsComponent;
  let fixture: ComponentFixture<DashboardExamnieeReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardExamnieeReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardExamnieeReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
