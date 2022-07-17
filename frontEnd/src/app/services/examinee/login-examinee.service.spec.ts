import { TestBed } from '@angular/core/testing';

import { LoginExamineeService } from './login-examinee.service';

describe('LoginExamineeService', () => {
  let service: LoginExamineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginExamineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
