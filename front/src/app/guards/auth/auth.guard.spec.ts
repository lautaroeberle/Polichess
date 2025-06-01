import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => {
        const router = TestBed.inject(Router);
        const loginService = TestBed.inject(LoginService);
        const guard = new AuthGuard(router, loginService);
        return guard.canActivate(...guardParameters);
      });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
