import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError, finalize } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { TokenService } from "../services/token/token.service";
import { UserAuthService } from "../services/user-auth/user-auth.service";
import { LoadingService } from "../components/loading/loading.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private token: TokenService,
    private userAuth: UserAuthService,
    public router: Router,
    private loadingService: LoadingService,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!environment.production) {
      return true;
    }
    const params = this.getParams(state.url);
    this.loadingService.open();
    return this.token.checkToken(params.code).pipe(
      mergeMap((isLogged) => {
        if (!isLogged) {
          console.log("not Logged.");
          return this.userAuth.getAuthUrl$().pipe(
            map((res) => {
              window.location.href = res.authUrl;
              return false;
            }),
          );
        } else {
          console.log("already Logged.");
          return this.token.handleGetUserInfo();
        }
      }),
      catchError((err) => {
        console.log("status: " + err.status + " message: " + err.message);
        if (err.status === 403 || err.status === 404) {
          this.router.navigate(["/permission-error"]);
        }
        return of(false);
      }),
      finalize(() => {
        this.loadingService.close();
      }),
    );
  }

  public getParams(url) {
    let keys = url
      .substring(url.indexOf("?") + 1)
      .replace("?", "")
      .split(/&/);
    keys = keys.map((e) => {
      return e.split(/=/);
    });
    return keys.reduce((p, e) => {
      p[e[0]] = e[1];
      return p;
    }, {});
  }
}
