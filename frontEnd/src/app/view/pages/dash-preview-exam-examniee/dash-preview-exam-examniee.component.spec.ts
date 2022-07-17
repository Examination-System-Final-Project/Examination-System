import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPreviewExamExamnieeComponent } from './dash-preview-exam-examniee.component';

describe('DashPreviewExamExamnieeComponent', () => {
  let component: DashPreviewExamExamnieeComponent;
  let fixture: ComponentFixture<DashPreviewExamExamnieeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashPreviewExamExamnieeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPreviewExamExamnieeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
