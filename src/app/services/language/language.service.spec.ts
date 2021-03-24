import { TestBed } from "@angular/core/testing";
import { DateAdapter } from "@angular/material/core";
import { StoreModule, Store } from "@ngrx/store";
import { TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { Moment } from "moment";

import { LanguageService } from "./language.service";
import { AppState } from "../../stores";
import { SetLang, State } from "../../stores/settings";
import { Constant } from "../../app.constant";

describe("LanguageService", () => {
  let service: LanguageService;
  let translateService: TranslateService;
  let dateAdapter: DateAdapter<Moment>;
  let store: Store<AppState>;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          {
            settings: (state) => state,
          },
          {
            initialState: { settings: initialStateSelected },
            runtimeChecks: {
              strictActionImmutability: true,
              strictActionSerializability: true,
              strictStateImmutability: true,
              strictStateSerializability: true,
            },
          },
        ),
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader },
        }),
      ],
      providers: [DateAdapter, TranslateService],
    }),
  );

  beforeEach(() => {
    service = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);
    store = TestBed.inject(Store);
    dateAdapter = TestBed.inject(DateAdapter);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  const initialStateSelected: State = {
    lang: "ja",
  };
  describe("enable", () => {
    it("should set initial lang to en", () => {
      // arrange
      sessionStorage.setItem(Constant.LANG_SETTING_KEY, "en");
      const spySetDefaultLang = jest.spyOn(translateService, "setDefaultLang");
      const spyUse = jest.spyOn(translateService, "use");
      const spySetLocale = jest.spyOn(dateAdapter, "setLocale");
      jest.spyOn(store, "dispatch");
      const expected = new SetLang("en");
      // act
      service.enable();

      // assert
      expect(spySetDefaultLang).toHaveBeenCalledWith("en");
      expect(spyUse).toHaveBeenCalledWith("en");
      expect(spySetLocale).toHaveBeenCalledWith("en");
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
    it("should set initial lang to ja", () => {
      // arrange
      sessionStorage.setItem(Constant.LANG_SETTING_KEY, "ja");
      const spySetDefaultLang = jest.spyOn(translateService, "setDefaultLang");
      const spyUse = jest.spyOn(translateService, "use");
      const spySetLocale = jest.spyOn(dateAdapter, "setLocale");
      const expected = new SetLang("ja");
      jest.spyOn(store, "dispatch");
      // act
      service.enable();

      // assert
      expect(spySetDefaultLang).toHaveBeenCalledWith("ja");
      expect(spyUse).toHaveBeenCalledWith("ja");
      expect(spySetLocale).toHaveBeenCalledWith("ja");
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });

    it("should set initial LANG_SETTING_KEY null", () => {
      // arrange
      sessionStorage.setItem(Constant.LANG_SETTING_KEY, null);
      const spySetDefaultLang = jest.spyOn(translateService, "setDefaultLang");
      const spyUse = jest.spyOn(translateService, "use");
      const spySetLocale = jest.spyOn(dateAdapter, "setLocale");
      const expected = new SetLang("en");
      jest.spyOn(store, "dispatch");
      // act
      service.enable();

      // assert
      expect(spySetDefaultLang).toHaveBeenCalledWith("en");
      expect(spyUse).toHaveBeenCalledWith("en");
      expect(spySetLocale).toHaveBeenCalledWith("en");
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
  });

  describe("setLang", () => {
    it("should dispatch Setlang action with langSelector", () => {
      // arrange
      const expected = new SetLang("en");
      const spyUse = jest.spyOn(translateService, "use");
      const spySetLocale = jest.spyOn(dateAdapter, "setLocale");
      jest.spyOn(store, "dispatch");
      // act
      service.setLang("en");

      // assert
      expect(spyUse).toHaveBeenCalledWith("en");
      expect(spySetLocale).toHaveBeenCalledWith("en");
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });
  });
});
