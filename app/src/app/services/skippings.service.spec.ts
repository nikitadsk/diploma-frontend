import { TestBed } from '@angular/core/testing';

import { SkippingsService } from './skippings.service';

describe('SkippingsService', () => {
  let service: SkippingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkippingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
