import { TestBed } from '@angular/core/testing';

import { PlacementVisitService } from './placement-visit.service';

describe('PlacementVisitService', () => {
  let service: PlacementVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacementVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
