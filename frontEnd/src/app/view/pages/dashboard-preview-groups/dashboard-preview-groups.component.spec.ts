import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPreviewGroupsComponent } from './dashboard-preview-groups.component';

describe('DashboardPreviewGroupsComponent', () => {
  let component: DashboardPreviewGroupsComponent;
  let fixture: ComponentFixture<DashboardPreviewGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPreviewGroupsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPreviewGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
