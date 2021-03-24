jest.mock("../services/token/token.service");
jest.mock("../services/user-auth/user-auth.service");
jest.mock("../../environments/environment", () => {
  return {
    environment: {
      production: true,
      endpoints: {
        bff: "localhost:3001",
      },
    },
  };
});
window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, "location", {
  value: {
    href: url,
  },
  writable: true,
});
import { TestBed, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Component } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { of, Observable, throwError } from "rxjs";

import * as mockENV from "../../environments/environment";
import { AuthGuard } from "./auth.guard";
import { TokenService } from "../services/token/token.service";
import { UserAuthService } from "../services/user-auth/user-auth.service";
import { LoadingService } from "../components/loading/loading.service";

@Component({
  template: ``,
})
class MockComponent {
  public title;
  public subtitle;
  public buttons;
  public tag;
}
class LoadingServiceMock {
  public open = jest.fn();
  public close = jest.fn();
  plusCountLoading = jest.fn();
}

describe(AuthGuard.name, () => {
  let token: jest.Mocked<TokenService>;
  let auth: jest.Mocked<UserAuthService>;
  let authGuard: AuthGuard;
  let router: Router;
  let loadingService: jest.Mocked<LoadingService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: "permission-error", component: MockComponent },
          { path: "term-conditions", component: MockComponent },
        ]),
      ],
      providers: [AuthGuard, TokenService, UserAuthService, { provide: LoadingService, useClass: LoadingServiceMock }],
    });
    token = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    auth = TestBed.inject(UserAuthService) as jest.Mocked<UserAuthService>;
    router = TestBed.inject(Router);
    loadingService = TestBed.inject(LoadingService) as jest.Mocked<LoadingService>;
    authGuard = new AuthGuard(token, auth, router, loadingService);
  });

  it("should  be injectable", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe("canActivate", () => {
    describe("logged", () => {
      it("should return false for canActivate() when isLoggedIn === true", (done) => {
        // arange
        token.checkToken.mockReturnValue(of(true));
        token.handleGetUserInfo.mockReturnValue(of(true));
        // act
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), { url: "" } as RouterStateSnapshot) as Observable<boolean>;
        result.subscribe((ret) => {
          // assert
          expect(ret).toBe(true);
          done();
        });
      });
    });
    describe("error", () => {
      it("should return false for canActivate() when isLoggedIn === false and couldn't get auth url", (done) => {
        // arange
        token.checkToken.mockReturnValue(of(false));
        token.handleGetUserInfo.mockReturnValue(of(true));
        auth.getAuthUrl$.mockReturnValue(throwError(new Error("Some error")));
        // act
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), {
          url: "",
        } as RouterStateSnapshot) as Observable<boolean>;
        result.subscribe((ret) => {
          // assert
          expect(ret).toBe(false);
          done();
        });
      });
      it("should navigate to permission-error when 403 error", (done) => {
        // arange
        const spy = jest.spyOn(authGuard.router, "navigate");
        token.checkToken.mockReturnValue(of(false));
        token.handleGetUserInfo.mockReturnValue(of(true));
        auth.getAuthUrl$.mockReturnValue(throwError(new HttpErrorResponse({ status: 403 })));
        // act
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), {
          url: "",
        } as RouterStateSnapshot) as Observable<boolean>;
        result.subscribe((ret) => {
          // assert
          expect(spy).toHaveBeenCalledWith(["/permission-error"]);
          expect(ret).toBe(false);
          done();
        });
      });
    });
    describe("not logged", () => {
      it("should change location when isLoggedIn === false and could get auth url", (done) => {
        // arange
        const testurl = "https://dummy.com/login";
        token.checkToken.mockReturnValue(of(false));
        token.handleGetUserInfo.mockReturnValue(of(true));
        auth.getAuthUrl$.mockReturnValue(of({ authUrl: testurl }));
        // act
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), { url: "" } as RouterStateSnapshot) as Observable<boolean>;
        result.subscribe(() => {
          // assert
          expect(window.location.href).toEqual(testurl);
          done();
        });
      });
    });
    describe("on mode not logged", () => {
      it("production is false", () => {
        // arange
        mockENV.environment.production = false;
        // act
        const result = authGuard.canActivate(new ActivatedRouteSnapshot(), { url: "" } as RouterStateSnapshot) as Observable<boolean>;
        expect(result).toEqual(true);
      });
    });
  });
  describe("getParams", () => {
    it("no params", () => {
      // arange
      const testurl = "https://dummy.com/login";
      const expected = {};

      // act
      const ret = authGuard.getParams(testurl);

      // assert
      expect(ret).toEqual(expected);
    });
    it("one params", () => {
      // arange
      const testurl = "https://dummy.com/login?key1=value1";
      const expected = { key1: "value1" };

      // act
      const ret = authGuard.getParams(testurl);

      // assert
      expect(ret).toEqual(expected);
    });
    it("three params", () => {
      // arange
      const testurl = "https://dummy.com/login?key1=value1&key2=value2&key3=value3";
      const expected = { key1: "value1", key2: "value2", key3: "value3" };

      // act
      const ret = authGuard.getParams(testurl);

      // assert
      expect(ret).toEqual(expected);
    });
  });
});
