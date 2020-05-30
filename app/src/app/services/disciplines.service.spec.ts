import { TestBed } from '@angular/core/testing';

import { DisciplinesService } from './disciplines.service';

describe('DisciplinesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisciplinesService = TestBed.get(DisciplinesService);
    expect(service).toBeTruthy();
  });
});
