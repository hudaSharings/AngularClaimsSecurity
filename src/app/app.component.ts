import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AppUserAuth } from './security/app-user-auth';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = "Paul's Training Company";
  securityObject: AppUserAuth = null;
  subscription: Subscription;
  canAccessProducts: boolean = false;
  canAccessCategories: boolean = false;

  constructor(private securityService: SecurityService) {
    this.securityObject = securityService.securityObject;
  }

  private updateProperties() {
    this.canAccessProducts = this.securityService.hasClaim("canAccessProducts", "true");
    this.canAccessCategories = this.securityService.hasClaim("canAccessCategories", "true");
  }

  ngOnInit() {
    this.subscription = this.securityService.securityReset
      .subscribe(() => this.updateProperties());
  }

  logout(): void {
    this.securityService.logout();
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
