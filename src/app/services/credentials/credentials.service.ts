import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap, finalize } from "rxjs/operators";

import { getCookie } from "../../components/utils";
import { Constant } from "../../app.constant";

@Injectable({
  providedIn: "root",
})
export class CredentialsService implements HttpInterceptor {
  private stopExpired = false;
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;
    const headers = new HttpHeaders();
    return next.handle(request.clone({ headers, withCredentials: true })).pipe(
      tap({
        next: (event) => (ok = event instanceof HttpResponse ? "succeeded" : ""),
        error: (err) => {
          ok = "failed";
          const sessionId = getCookie(Constant.SESSION_KEY);
          if (err.status === 401 && !this.stopExpired) {
            document.cookie = Constant.SESSION_KEY + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
            this.router.navigate(["login"]);
          } else if (err.status === 403) {
            if (!!sessionId) {
              this.router.navigate(["permission-error"]);
            }
          }
        },
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        console.log(`${request.method} "${request.urlWithParams}" ${ok} in ${elapsed} ms.`);
      }),
    );
  }
  public updateForceExpired(value: boolean): Observable<boolean> {
    this.stopExpired = value;
    return of(this.stopExpired);
  }
}
