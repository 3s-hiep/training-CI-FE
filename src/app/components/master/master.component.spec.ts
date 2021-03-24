import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of, throwError } from "rxjs";

import { MasterComponent } from "./master.component";
import { LanguageService } from "../../services/language/language.service";
import { TokenService } from "../../services/token/token.service";
import { LoadingService } from "../loading/loading.service";
import { UserAuthService } from "../../services/user-auth/user-auth.service";
import { MatDialogModule, MatDialog } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

class MockLanguageService {
  public enable = jest.fn();
}

class MockTokenService {
  public clear = jest.fn();
  public changePassword = jest.fn();
}

class MockUserAuthService {
  public postLogout$ = jest.fn();
}

class LoadingServiceMock {
  public open = jest.fn();
  public close = jest.fn();
}

describe("MasterComponent", () => {
  let component: MasterComponent;
  let fixture: ComponentFixture<MasterComponent>;
  let tokenService: jest.Mocked<TokenService>;
  let loadingService: jest.Mocked<LoadingService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterComponent],
      imports: [MatDialogModule, BrowserAnimationsModule, RouterTestingModule.withRoutes([{ path: "page", component: MasterComponent }])],
      providers: [
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: TokenService, useClass: MockTokenService },
        { provide: LoadingService, useClass: LoadingServiceMock },
        { provide: UserAuthService, useClass: MockUserAuthService },
        MatDialog,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    tokenService = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    loadingService = TestBed.inject(LoadingService) as jest.Mocked<LoadingService>;
    tokenService.changePassword.mockReturnValue(of({}));
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'CI-Enterprise'`, () => {
    expect(component.title).toEqual("header.appTitle");
  });

  describe("gotoPage", () => {
    it("should call navigate", () => {
      // arrange
      const page = "page";
      const expected = ["/" + page];
      const spy = jest.spyOn(component.router, "navigate");
      // act
      fixture.ngZone.run(() => {
        component.gotoPage(page);
        // assert
        expect(spy).toHaveBeenCalledWith(expected);
      });
    });
  });

  describe("onSelectedUserMenu", () => {
    it("select Logout - router navigate should be called", () => {
      // arrange
      const expected = ["/logout"];
      const spy = jest.spyOn(component.router, "navigate").mockImplementationOnce(() => {
        return new Promise((r) => r(true));
      });
      // act
      const spy1 = jest.spyOn(component.userAuthService, "postLogout$").mockReturnValue(of(true));
      component.onSelectedUserMenu("Logout");
      // assert
      expect(loadingService.open).toHaveBeenCalled();
      expect(tokenService.clear).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(expected);
      expect(spy1).toHaveBeenCalled();
    });
    it("select Logout - on error", () => {
      // arrange
      const expected = ["/logout"];
      const spy = jest.spyOn(component.router, "navigate").mockImplementationOnce(() => {
        return new Promise((r) => r(true));
      });
      // act
      const spy1 = jest.spyOn(component.userAuthService, "postLogout$").mockReturnValue(throwError({}));
      component.onSelectedUserMenu("Logout");
      // assert
      expect(loadingService.open).toHaveBeenCalled();
      expect(tokenService.clear).not.toHaveBeenCalled();
      expect(spy).not.toHaveBeenCalledWith(expected);
      expect(spy1).toHaveBeenCalled();
      expect(loadingService.close).toHaveBeenCalled();
    });
  });
  it("onSelectedUserMenu return event default default", () => {
    // arrange
    const expected = ["/notLogout"];
    const spy = jest.spyOn(component.router, "navigate").mockImplementationOnce(() => {
      return new Promise((r) => r(true));
    });
    // act
    const spy1 = jest.spyOn(component.userAuthService, "postLogout$").mockReturnValue(throwError({}));
    component.onSelectedUserMenu("notLogout");
    // assert
    expect(loadingService.open).not.toHaveBeenCalled();
    expect(spy).not.toHaveBeenCalledWith(expected);
    expect(spy1).not.toHaveBeenCalled();
    expect(loadingService.close).not.toHaveBeenCalled();
  });
});
