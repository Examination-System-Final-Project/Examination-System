import { TestBed } from '@angular/core/testing';

import { EditExamineeService } from './edit-examinee.service';

describe('EditExamineeService', () => {
  let service: EditExamineeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditExamineeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
