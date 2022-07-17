import { TestBed } from '@angular/core/testing';

import { AssignQuestionsService } from './assign-questions.service';

describe('AssignQuestionsService', () => {
  let service: AssignQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
