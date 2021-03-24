import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError, of } from "rxjs";
import { catchError, finalize, map } from "rxjs/operators";

import { UserAuthService } from "../user-auth/user-auth.service";
import { getCookie } from "../../components/utils";
import { Constant } from "../../app.constant";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  constructor(private userAuth: UserAuthService, public router: Router) {
    this.refresh();
  }

  info = {
    user: {
      // User Info
      displayName: "",
      email: "",
      userId: "",
      firstLoginDate: "",
      language: "",
    },
  };

  // authentication code
  code = "";
  public setAuthCode(code) {
    this.code = code;
  }

  public getUserInfo() {
    return this.info.user;
  }

  /**
   * get all cookie values and update
   */
  public refresh() {
    this.info.user.firstLoginDate = sessionStorage.getItem("firstLoginDate") || "";
    this.info.user.displayName = sessionStorage.getItem("displayName") || "";
    this.info.user.email = sessionStorage.getItem("email") || "";
    this.info.user.userId = sessionStorage.getItem("userId") || "";
    this.info.user.language = sessionStorage.getItem(Constant.LANG_SETTING_KEY) || "";
  }

  public clear() {
    sessionStorage.removeItem("firstLoginDate");
    sessionStorage.removeItem("displayName");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem(Constant.LANG_SETTING_KEY);
    this.refresh();
  }

  /**
   *  session check (Top Page)
   */
  public checkToken(code: string): Observable<any> {
    const sessionId = getCookie(Constant.SESSION_KEY);
    if (!!sessionId) {
      return of(true);
    } else if (!!code) {
      this.setAuthCode(code);
      return this.doLogin().pipe(map((ret) => ret));
    }
    return of(false);
  }

  /**
   * Check the data in cookie null will call api get UserInfo
   */
  public handleGetUserInfo(): Observable<any> {
    const dataSession = [
      this.info.user.firstLoginDate,
      this.info.user.displayName,
      this.info.user.email,
      this.info.user.userId,
      this.info.user.language,
    ];
    const checkEmptyData = (el) => !!!el;
    const temp: boolean = dataSession.some(checkEmptyData);
    if (temp) {
      return this.userAuth.getUserInfo$(Constant.APPLICATION_ID).pipe(
        map((res: any) => {
          this.storeToken(res);
          return of(true);
        }),
        catchError((error) => {
          return throwError(error);
        }),
        finalize(() => {
          return of(true);
        }),
      );
    }

    return of(true);
  }

  /**
   * to run the login
   */
  public doLogin(): Observable<any> {
    return this.userAuth.getTokenInfo$(this.code).pipe(
      map(() => {
        return this.handleGetUserInfo();
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }

  /**
   * store token
   */
  public storeToken(res) {
    sessionStorage.setItem("firstLoginDate", res.firstLoginDate);
    sessionStorage.setItem("displayName", res.displayName);
    sessionStorage.setItem("email", res.email);
    sessionStorage.setItem("userId", res.userId);
    sessionStorage.setItem(Constant.LANG_SETTING_KEY, res.language);
    this.refresh();
    if (!!!res.firstLoginDate) {
      this.router.navigate(["/term-conditions"]);
    }
  }

  public checkAppPermission(): boolean {
    // expiration date check
    const now = Date.now() / 1000;
    const appValidTime = sessionStorage.getItem("app_valid_time");
    if (appValidTime === "" || Number(appValidTime) < now) {
      return false;
    }
    return true;
  }

  public changePassword(): Observable<any> {
    this.refresh();
    const email = this.getUserInfo().email;
    return this.userAuth.postChangePassword$(email).pipe(
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
