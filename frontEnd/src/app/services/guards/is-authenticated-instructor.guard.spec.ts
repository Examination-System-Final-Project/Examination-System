import { TestBed } from '@angular/core/testing';

import { IsAuthenticatedInstructorGuard } from './is-authenticated-instructor.guard';

describe('IsAuthenticatedInstructorGuard', () => {
  let guard: IsAuthenticatedInstructorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthenticatedInstructorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
