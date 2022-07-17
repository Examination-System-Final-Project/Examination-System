import { TestBed } from '@angular/core/testing';

import { AuthenticateExamineeService } from './authenticate-examinee.service';

describe('AuthenticateExamineeService', () => {
  let service: AuthenticateExamineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateExamineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
