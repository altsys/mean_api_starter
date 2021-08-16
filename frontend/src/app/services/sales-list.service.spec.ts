import { TestBed } from '@angular/core/testing';

import { SalesListService } from './sales-list.service';

describe('SalesListService', () => {
  let service: SalesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
