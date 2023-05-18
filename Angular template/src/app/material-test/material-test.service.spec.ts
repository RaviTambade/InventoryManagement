import { TestBed } from '@angular/core/testing';

import { MaterialTestService } from './material-test.service';

describe('MaterialTestService', () => {
  let service: MaterialTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
