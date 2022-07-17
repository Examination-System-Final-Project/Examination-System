import { TestBed } from '@angular/core/testing';

import { AuthenticateInstructorService } from './authenticate-instructor.service';

describe('AuthenticateInstructorService', () => {
  let service: AuthenticateInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
