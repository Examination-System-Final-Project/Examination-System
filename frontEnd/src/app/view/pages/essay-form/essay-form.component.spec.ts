import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayFormComponent } from './essay-form.component';

describe('EssayFormComponent', () => {
  let component: EssayFormComponent;
  let fixture: ComponentFixture<EssayFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssayFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EssayFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
