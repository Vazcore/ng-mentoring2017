import { TestBed, inject } from '@angular/core/testing';

import { CanActivateLoginService } from './can-activate-login.service';

describe('CanActivateLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActivateLoginService]
    });
  });

  it('should be created', inject([CanActivateLoginService], (service: CanActivateLoginService) => {
    expect(service).toBeTruthy();
  }));
});
