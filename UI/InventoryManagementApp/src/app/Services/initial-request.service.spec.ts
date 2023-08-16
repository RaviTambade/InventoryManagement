import { TestBed } from '@angular/core/testing';

import { InitialRequestService } from './initial-request.service';

describe('InitialRequestService', () => {
  let service: InitialRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
