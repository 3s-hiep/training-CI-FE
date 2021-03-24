import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

import * as tokens_json from "../../../assets/i18n/tokens.json";

@Injectable({
  providedIn: "root",
})
export class NotificationService implements HttpInterceptor {
  public tokens: any;
  constructor(public toastr: ToastrService, public translateService: TranslateService) {
    this.tokens = tokens_json.notification;
  }
  handleError(error: HttpErrorResponse, method?: string) {
    console.log(`Error Code: ${error.status}\nMessage: ${error.message}`);
    switch (method) {
      case "DELETE":
      case "PUT":
        try {
          const title = this.translateService.instant(this.tokens.error.title);
          const message = this.translateService.instant(error.error.error);
          this.toastr.error(message, title, {
            closeButton: true,
            timeOut: 3000,
          });
        } catch {}

        break;

      default:
        if (error.status !== 404 && error.status !== 403 && error.status !== 401) {
          const title = this.translateService.instant(this.tokens.error.title);
          const message = this.translateService.instant(this.tokens.error.message);
          this.toastr.error(message, title, {
            closeButton: true,
            timeOut: 3000,
          });
        }
        break;
    }
  }

  handleEvent(event: HttpEvent<any>) {
    if (event instanceof HttpResponse && event.status === 201) {
      const title = this.translateService.instant(this.tokens.success.title);
      const message = this.translateService.instant(this.tokens.success.message);
      this.toastr.success(message, title, {
        closeButton: true,
        timeOut: 3000,
      });
    }
    console.log("Event: ", event);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        this.handleEvent(event);
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error, req.method);
        return throwError(error);
      }),
    );
  }
}
