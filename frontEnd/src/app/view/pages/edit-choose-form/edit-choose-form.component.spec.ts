import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChooseFormComponent } from './edit-choose-form.component';

describe('EditChooseFormComponent', () => {
  let component: EditChooseFormComponent;
  let fixture: ComponentFixture<EditChooseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditChooseFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChooseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
