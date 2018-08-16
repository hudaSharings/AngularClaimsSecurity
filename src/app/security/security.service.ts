import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { LOGIN_MOCKS } from './login-mocks';
import { AppUserClaim } from './app-user-claim';

@Injectable()
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();
  private hasChanged = new BehaviorSubject<number>(0);
  securityReset = this.hasChanged.asObservable();

  constructor() { }

  login(entity: AppUser): Observable<AppUserAuth> {
    // Initialize security object
    this.resetSecurityObject();

    // Use object assign to update the current object
    // NOTE: Don't create a new AppUserAuth object
    //       because that destroys all references to object
    Object.assign(this.securityObject,
      LOGIN_MOCKS.find(user => user.userName.toLowerCase() ===
        entity.userName.toLowerCase()));
    if (this.securityObject.userName !== "") {
      // Store into local storage
      localStorage.setItem("bearerToken",
        this.securityObject.bearerToken);

      // Inform everyone that the security object has changed.
      this.hasChanged.next(0);
    }

    return of<AppUserAuth>(this.securityObject);
  }

  // This method can be called a couple of different ways
  // *hasClaim="'claimType'"  // Assumes claimValue is true
  // *hasClaim="'claimType:value'"  // Compares claimValue to value
  // *hasClaim="['claimType1','claimType2:value', 'claimType3']"
  hasClaim(claimType: any, claimValue?: any) {
    let ret: boolean = false;

    // See if an array of values was passed in.
    if (typeof claimType === "string") {
      ret = this.isClaimValid(claimType, claimValue);
    }
    else {
      let claims: string[] = claimType;
      if (claims) {
        for (let index = 0; index < claims.length; index++) {
          ret = this.isClaimValid(claims[index]);
          // If one is successful, then let them in
          if (ret) {
            break;
          }
        }
      }
    }

    return ret;
  }

  private isClaimValid(claimType: string, claimValue?: string) {
    let ret: boolean = false;
    let auth: AppUserAuth = null;

    // Retrieve security object
    auth = this.securityObject;
    if (auth) {
      // See if the claim type has a value
      // *hasClaim="'claimType:value'"
      if (claimType.indexOf(":") >= 0) {
        let words: string[] = claimType.split(":");
        claimType = words[0];
        claimValue = words[1];
      }
      else {
        // Either get the claim value, or assume 'true'
        claimValue = claimValue ? claimValue : "true";
      }
      // Attempt to find the claim
      ret = auth.claims.find(c => c.claimType == claimType
        && c.claimValue == claimValue) != null;
    }

    return ret;
  }

  logout(): void {
    this.resetSecurityObject();
  }

  resetSecurityObject(): void {
    this.securityObject.userName = "";
    this.securityObject.bearerToken = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.claims = [];

    // Inform everyone that the security object has changed.
    this.hasChanged.next(0);

    localStorage.removeItem("bearerToken");
  }

}
