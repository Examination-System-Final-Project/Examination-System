import { TestBed } from '@angular/core/testing';

import { ListStudentExamService } from './list-student-exam.service';

describe('ListStudentExamService', () => {
  let service: ListStudentExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListStudentExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
