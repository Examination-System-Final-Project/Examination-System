import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishAttemptDialogComponent } from './finish-attempt-dialog.component';

describe('FinishAttemptDialogComponent', () => {
  let component: FinishAttemptDialogComponent;
  let fixture: ComponentFixture<FinishAttemptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishAttemptDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishAttemptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
