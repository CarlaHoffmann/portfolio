import { TestBed } from '@angular/core/testing';

import { TechDataService } from './tech-data.service';

describe('TechDataService', () => {
  let service: TechDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
