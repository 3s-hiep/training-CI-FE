import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, mergeMap } from "rxjs/operators";

import { BackendService } from "../backend/backend.service";
import { CredentialsService } from "../credentials/credentials.service";
import { Constant } from "../../app.constant";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  public application = window.location.origin;
  public loginCallback = "/users"; // TODO: Replace
  public userManagerLoginCallback = "/users"; // TODO: Replace
  constructor(public backendService: BackendService, public credentialsService: CredentialsService) {}

  /**
   * Get IbmCloud login URL
   */

  public getAuthUrl$(): Observable<any> {
    return this.backendService.getLogin(`${this.application}${this.userManagerLoginCallback}`);
  }

  /**
   * Get IbmCloud token
   * @param code string
   * @param applicationId Type of Application ID default APPLICATION_ID
   */
  public getTokenInfo$(code: string, applicationId = Constant.APPLICATION_ID): Observable<any> {
    const redirectUrl = `${this.application}${this.loginCallback}`;
    return this.backendService.getUrlToken(applicationId, redirectUrl, code);
  }

  /**
   * Get IbmCloud User information
   * @param applicationId Type of Application ID default APPLICATION_ID
   */
  public getUserInfo$(applicationId = Constant.APPLICATION_ID): Observable<any> {
    return this.backendService.getUserInfo(applicationId);
  }

  /**
   * Post IbmCloud Change Password
   * @param email string
   */
  public postChangePassword$(email: string): Observable<any> {
    return this.backendService.postChangePassword(email);
  }

  /**
   * Post Logout
   * @param token string
   */
  public postLogout$(): Observable<any> {
    return this.credentialsService.updateForceExpired(true).pipe(
      mergeMap(() => this.backendService.postLogout()),
      catchError((error) => throwError(error)),
    );
  }

  /**
   * Update or Insert User setting languages
   * @param languages Type string example en,ja
   * @param applicationId Type of Application ID default APPLICATION_ID
   */
  public putUserSettings$(language: string, applicationId = Constant.APPLICATION_ID): Observable<any> {
    return this.backendService.putUserSettings({ value: language }, Constant.LANG_SETTING_KEY, applicationId);
  }
}
