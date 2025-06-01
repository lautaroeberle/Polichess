import { TestBed } from '@angular/core/testing';

import { EventoLoginService } from './evento-login.service';

describe('EventoLoginService', () => {
  let service: EventoLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventoLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
