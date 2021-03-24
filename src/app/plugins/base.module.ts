import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from "@angular/material/core";
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from "@angular/material-moment-adapter";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

import { createTranslateLoader } from "./translate.plugin";
import { DATE_FORMATS } from "../pipes/localized-date/localized-date.pipe";

@NgModule({
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, TranslateModule],
  imports: [
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    // NOTE: If MatMomentDateModule works fine, use it.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ,
  ],
})
export class BaseModule {}
