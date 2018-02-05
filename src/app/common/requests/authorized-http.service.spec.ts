import { TestBed, inject } from '@angular/core/testing';

import { AuthorizedHttpService } from './authorized-http.service';

describe('AuthorizedHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizedHttpService]
    });
  });

  it('should be created', inject([AuthorizedHttpService], (service: AuthorizedHttpService) => {
    expect(service).toBeTruthy();
  }));
});
