import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewExamForExmaineeComponent } from './preview-exam-for-exmainee.component';

describe('PreviewExamForExmaineeComponent', () => {
  let component: PreviewExamForExmaineeComponent;
  let fixture: ComponentFixture<PreviewExamForExmaineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewExamForExmaineeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewExamForExmaineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
