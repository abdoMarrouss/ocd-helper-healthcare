import { TestBed } from '@angular/core/testing';

import { FearHierarchy } from './fear-hierarchy';

describe('FearHierarchy', () => {
  let service: FearHierarchy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FearHierarchy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
