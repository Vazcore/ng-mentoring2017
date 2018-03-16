import { TestBed, inject } from '@angular/core/testing';

import { CanActivateAppService } from './can-activate-app.service';

describe('CanActivateAppService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateAppService]
    });
  });

  it('should be created', inject([CanActivateAppService], (service: CanActivateAppService) => {
    expect(service).toBeTruthy();
  }));
});
