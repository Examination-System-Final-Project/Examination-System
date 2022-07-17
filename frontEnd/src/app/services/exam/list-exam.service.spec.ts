import { TestBed } from '@angular/core/testing';

import { ListExamService } from './list-exam.service';

describe('ListExamService', () => {
  let service: ListExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
