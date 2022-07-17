import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExamListComponent } from './dashboard-exam-list.component';

describe('DashboardExamListComponent', () => {
  let component: DashboardExamListComponent;
  let fixture: ComponentFixture<DashboardExamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardExamListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
