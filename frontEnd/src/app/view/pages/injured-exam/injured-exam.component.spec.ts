import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjuredExamComponent } from './injured-exam.component';

describe('InjuredExamComponent', () => {
  let component: InjuredExamComponent;
  let fixture: ComponentFixture<InjuredExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjuredExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InjuredExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
