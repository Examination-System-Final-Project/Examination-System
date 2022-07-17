import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashExamsComponent } from './dash-exams.component';

describe('DashExamsComponent', () => {
  let component: DashExamsComponent;
  let fixture: ComponentFixture<DashExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
