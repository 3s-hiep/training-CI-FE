import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { Observable, of } from "rxjs";
import { delay, switchMap, take } from "rxjs/operators";
import { utc, Moment } from "moment";

import { LoadingComponent } from "./loading.component";

import tokens_json from "../../../assets/i18n/tokens.json";

@Injectable({ providedIn: "root" })
export class LoadingService {
  public isOpen = false;
  public openTime: Moment = utc();
  public timeoutTime = 60000;

  public timeoutWatcher: Observable<null>;
  public timeout = null;
  public countOpenLoading = 0;
  public tokens = tokens_json
    ? tokens_json.loading
    : {
        timeout: {
          title: "loading.timeout.title",
          message: "loading.timeout.message",
        },
      };
  public dialogRef: any;
  constructor(public dialog: MatDialog, public toastrService: ToastrService, public translateService: TranslateService) {}

  open(): void {
    this.countOpenLoading++;
    if (this.isOpen === false) {
      this.dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      this.isOpen = true;
    }
    this.openTime = utc();
    this.timeoutWatcher = this.timeoutTimer$(this.openTime, this);
    this.timeoutWatcher.subscribe();
    return;
  }

  openWithoutTimeout(): void {
    if (this.isOpen === false) {
      this.dialogRef = this.dialog.open(LoadingComponent, { disableClose: true });
      this.isOpen = true;
    }
    this.openTime = utc();
    return;
  }

  close(): void {
    this.countOpenLoading--;
    if (this.countOpenLoading < 0) {
      this.countOpenLoading = 0;
    }
    if (this.isOpen === false) {
      this.countOpenLoading = 0;
      return;
    }
    setTimeout(() => {
      if (this.countOpenLoading <= 0) {
        this.dialogRef.close();
        this.countOpenLoading = 0;
        this.isOpen = false;
      }
      return;
    }, 500);
  }

  timeoutTimer$(openTime: Moment, service: LoadingService): Observable<null> {
    return of(openTime).pipe(
      switchMap((ot: Moment) =>
        of(null).pipe(
          delay(service.timeoutTime),
          take(1),
          switchMap(() => {
            if (service.isOpen === false) {
              return of(null);
            }
            if (service.openTime !== ot) {
              return of(null);
            }

            const title = service.translateService.instant(service.tokens.timeout.title);
            const message = service.translateService.instant(service.tokens.timeout.message);
            this.toastrService.error(message, title, {
              closeButton: true,
              timeOut: 3000,
            });
            service.close();

            return of(null);
          }),
        ),
      ),
    );
  }
  public plusCountLoading() {
    this.countOpenLoading++;
  }
  public minusCountLoading() {
    this.countOpenLoading--;
  }
}
