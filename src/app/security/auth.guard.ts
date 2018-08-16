import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SecurityService } from './security.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private securityService: SecurityService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Get claim type on security object to check
    let claimType: string = next.data["claimType"];

    // Check security claim
    if (this.securityService.securityObject.isAuthenticated
      && this.securityService.hasClaim(claimType)) {
      return true;
    }
    else {
      this.router.navigate(['login'],
        { queryParams: { returnUrl: state.url } });
      return false;
    }

  }
}
