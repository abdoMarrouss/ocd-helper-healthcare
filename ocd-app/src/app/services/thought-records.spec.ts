import { TestBed } from '@angular/core/testing';

import { ThoughtRecords } from './thought-records';

describe('ThoughtRecords', () => {
  let service: ThoughtRecords;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThoughtRecords);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
