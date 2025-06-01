import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  const executeGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => 
      TestBed.runInInjectionContext(() => {
        const router = TestBed.inject(Router);
        const loginService = TestBed.inject(LoginService);
        const guard = new AdminGuard(router, loginService);
        return guard.canActivate(route, state);
      });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
