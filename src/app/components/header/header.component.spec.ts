jest.mock("../../services/language/language.service");

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { HeaderComponent } from "./header.component";
import { LanguageService } from "../../services/language/language.service";
import { TokenService } from "../../services/token/token.service";
import { UserAuthService } from "../../services/user-auth/user-auth.service";
import { TranslateModule } from "@ngx-translate/core";

class LanguageServiceMock {
  public setLang = jest.fn(() => {});
}
class MockTokenService {
  public clear = jest.fn();
  public changePassword = jest.fn();
  public refresh = jest.fn();
  public getUserInfo = jest.fn().mockReturnValue({
    displayName: "displayName",
  });
}

class MockUserAuthService {
  public settingLanguage = jest.fn();
}

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let language: LanguageService;
  let tokenService: jest.Mocked<TokenService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: LanguageService, useClass: LanguageServiceMock },
        { provide: TokenService, useClass: MockTokenService },
        { provide: UserAuthService, useClass: MockUserAuthService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    language = TestBed.inject(LanguageService);
    tokenService = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("onClickTitle", () => {
    it("should call clickedTitle", () => {
      component.tokenService.getUserInfo = jest.fn().mockReturnValue(null);
      component.ngOnInit();
      expect(component.userName).toBe("John Doe");
    });
  });
  describe("ngOnInit", () => {
    it("should call ngOnInit set userName", () => {
      // arrange
      const spy = jest.spyOn(component.clickedTitle, "emit");
      // act
      component.onClickTitle();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onClickUserIcon", () => {
    it("should call clickedUserIcon", () => {
      // arrange
      const spy = jest.spyOn(component.clickedUserIcon, "emit");
      // act
      component.onClickUserIcon();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe("onClickUserMenu", () => {
    it("should call selectedUserMenu with seleced", () => {
      // arrange
      const expected = "menu";
      const spy = jest.spyOn(component.selectedUserMenu, "emit");
      // act
      component.onClickUserMenu(expected);
      // assert
      expect(spy).toHaveBeenCalledWith(expected);
    });
  });

  describe("onSetLang", () => {
    it("should call set language with selected", () => {
      component.onSetLang("en");
      // arrange
      const expected = "de";
      // act
      component.onSetLang(expected);
      // assert
      expect(language.setLang).toHaveBeenCalledWith(expected);
      expect(tokenService.refresh).toHaveBeenCalled();
    });
  });
});
