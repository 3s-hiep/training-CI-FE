import { Injectable } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngrx/store";
import { Moment } from "moment";

import { AppState } from "../../stores";
import { SetLang } from "../../stores/settings";
import { Constant } from "../../app.constant";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  constructor(private translateService: TranslateService, private store: Store<AppState>, private dateAdapter: DateAdapter<Moment>) {}

  public enable() {
    const languages = sessionStorage.getItem(Constant.LANG_SETTING_KEY) || "en";
    // set initial lang to en
    this.translateService.setDefaultLang(languages);
    this.translateService.use(languages);
    this.dateAdapter.setLocale(languages);
    this.store.dispatch(new SetLang(languages));
  }

  public setLang(lang: string) {
    this.translateService.use(lang);
    this.dateAdapter.setLocale(lang);
    this.store.dispatch(new SetLang(lang));
  }
}
