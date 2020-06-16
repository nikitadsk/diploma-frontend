import { TestBed } from '@angular/core/testing';

import { IsAuthorizationedGuard } from './is-authorizationed.guard';

describe('IsAuthorizationedGuard', () => {
  let guard: IsAuthorizationedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsAuthorizationedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
