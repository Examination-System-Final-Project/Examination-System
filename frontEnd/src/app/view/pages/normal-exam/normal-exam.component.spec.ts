import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalExamComponent } from './normal-exam.component';

describe('NormalExamComponent', () => {
  let component: NormalExamComponent;
  let fixture: ComponentFixture<NormalExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormalExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
