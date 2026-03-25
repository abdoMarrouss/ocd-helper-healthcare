import { TestBed } from '@angular/core/testing';

import { ErpSessions } from './erp-sessions';

describe('ErpSessions', () => {
  let service: ErpSessions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErpSessions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
