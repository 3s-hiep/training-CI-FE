import { NgModule } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

export class TranslateServiceMock {
  public setDefaultLang() {}
  public use() {}
}

export class LanguageServiceMock {
  public setLang(lang: string) {
    console.log(lang);
  }
}
@NgModule()
export class I18nModule {
  constructor(translate: TranslateService) {
    translate.setDefaultLang("en");
    translate.use("en");
  }
}
