import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardNavigationComponent } from './student-dashboard-navigation.component';

describe('StudentDashboardNavigationComponent', () => {
  let component: StudentDashboardNavigationComponent;
  let fixture: ComponentFixture<StudentDashboardNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentDashboardNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
