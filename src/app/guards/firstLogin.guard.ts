import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { TokenService } from "../services/token/token.service";

@Injectable({
  providedIn: "root",
})
export class FirstLoginGuard implements CanActivate {
  constructor(private token: TokenService, public router: Router) {}
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!environment.production) {
      return true;
    }
    const userInfo = this.token.getUserInfo();
    if (userInfo.userId && userInfo.email && (userInfo.firstLoginDate === "undefined" || !userInfo.firstLoginDate)) {
      this.router.navigate(["/term-conditions"]);
      return false;
    }
    return true;
  }
}
