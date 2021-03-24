jest.mock("../services/token/token.service");
jest.mock("../services/user-auth/user-auth.service");

import { TestBed, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import * as env from "../../environments/environment";
import { TokenService } from "../services/token/token.service";
import { UserAuthService } from "../services/user-auth/user-auth.service";
import { FirstLoginGuard } from "./firstLogin.guard";

@Component({
  template: ``,
})
class MockComponent {
  public title;
  public subtitle;
  public buttons;
  public tag;
}

describe(FirstLoginGuard.name, () => {
  let token: jest.Mocked<TokenService>;
  let firstLoginGuard: FirstLoginGuard;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MockComponent],
      imports: [RouterTestingModule.withRoutes([{ path: "term-conditions", component: MockComponent }])],
      providers: [FirstLoginGuard, TokenService, UserAuthService],
    });
    token = TestBed.inject(TokenService) as jest.Mocked<TokenService>;
    router = TestBed.inject(Router);
    firstLoginGuard = new FirstLoginGuard(token, router);
    env.environment.production = true;
  });

  it("should  be injectable", inject([FirstLoginGuard], (guard: FirstLoginGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe("canActivate", () => {
    describe("Is user not first login", () => {
      it("should return false for canActivate() return false and go to term-conditions", () => {
        const spy = jest.spyOn(firstLoginGuard.router, "navigate");
        token.getUserInfo.mockReturnValue({
          displayName: "UT Name",
          email: "ut@email.com",
          userId: "0000-000-000-001",
          firstLoginDate: null,
          language: "en",
        });
        // act
        const result = firstLoginGuard.canActivate() as Observable<boolean>;
        expect(spy).toBeCalled();
        expect(result).toBe(false);
      });
      it("Run app production is false ", () => {
        env.environment.production = false;
        const result = firstLoginGuard.canActivate() as Observable<boolean>;
        const spy = jest.spyOn(firstLoginGuard.router, "navigate");
        expect(spy).not.toBeCalled();
        expect(result).toBe(true);
      });
    });
    describe("error", () => {
      it("should return false for canActivate() return true and not go to term-conditions", () => {
        // arange
        env.environment.production = true;
        const spy = jest.spyOn(firstLoginGuard.router, "navigate");
        token.getUserInfo.mockReturnValue({
          displayName: "UT Name",
          email: "ut@email.com",
          userId: "0000-000-000-001",
          firstLoginDate: "28-09-2020",
          language: "en",
        });
        // act
        const result = firstLoginGuard.canActivate() as Observable<boolean>;
        expect(spy).not.toBeCalled();
        expect(result).toBe(true);
      });
    });
  });
});
