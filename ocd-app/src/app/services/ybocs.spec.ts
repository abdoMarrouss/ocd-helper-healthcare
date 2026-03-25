import { TestBed } from '@angular/core/testing';

import { Ybocs } from './ybocs';

describe('Ybocs', () => {
  let service: Ybocs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ybocs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
