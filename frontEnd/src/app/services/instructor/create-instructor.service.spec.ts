import { TestBed } from '@angular/core/testing';

import { CreateInstructorService } from './create-instructor.service';

describe('CreateInstructorService', () => {
  let service: CreateInstructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateInstructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
