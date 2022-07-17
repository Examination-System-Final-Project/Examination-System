import { TestBed } from '@angular/core/testing';

import { DeleteQuestionBankService } from './delete-question-bank.service';

describe('DeleteQuestionBankService', () => {
  let service: DeleteQuestionBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteQuestionBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
