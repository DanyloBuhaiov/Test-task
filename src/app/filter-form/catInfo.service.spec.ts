import { TestBed } from '@angular/core/testing';

import { CatInfoService } from './catInfo.service';

describe('BreedService', () => {
  let service: CatInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
