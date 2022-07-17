import { TestBed } from '@angular/core/testing';

import { ExamineeExamService } from './examinee-exam.service';

describe('ExamineeExamService', () => {
  let service: ExamineeExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamineeExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
