import { TestBed } from '@angular/core/testing';

import { PlacementAuthReqService } from './placement-auth-req.service';

describe('PlacementAuthReqServiceService', () => {
  let service: PlacementAuthReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacementAuthReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
