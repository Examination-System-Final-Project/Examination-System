import { TestBed } from '@angular/core/testing';

import { CreateExamineeService } from './create-examinee.service';

describe('CreateExamineeService', () => {
  let service: CreateExamineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateExamineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
