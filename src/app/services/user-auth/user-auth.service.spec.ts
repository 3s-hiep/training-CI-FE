jest.mock("../../services/backend/backend.service");

import { TestBed, getTestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, throwError } from "rxjs";

import { UserAuthService } from "./user-auth.service";
import { BackendService } from "../backend/backend.service";
import { CredentialsService } from "../credentials/credentials.service";
import { Constant } from "../../app.constant";

class CredentialsServiceMock {
  updateForceExpired = jest.fn().mockImplementation().mockReturnValueOnce(of(true));
}

describe("UserAuthService", () => {
  let injector: TestBed;
  let service: UserAuthService;
  let backendService: jest.Mocked<BackendService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserAuthService,
        BackendService,
        {
          provide: CredentialsService,
          useClass: CredentialsServiceMock,
        },
      ],
    });
    injector = getTestBed();
    backendService = injector.inject(BackendService) as jest.Mocked<BackendService>;
    service = injector.inject(UserAuthService);
  });

  test("should create", () => {
    expect(service).toBeTruthy();
  });

  describe("getAuthUrl$", () => {
    it("should return valid data", () => {
      // arrange
      const expected = "success";
      const cy = jest.spyOn(backendService, "getLogin").mockReturnValue(of({}));
      // act
      const actual$ = service.getAuthUrl$();
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(cy).toHaveBeenCalled();
          expect(actual.return).toEqual(expected);
        },
        error: (err) => fail(err),
      });
    });

    test("should getLogin throws error", () => {
      // arrange
      const error = new Error("something happen");
      jest.spyOn(backendService, "getLogin").mockReturnValue(throwError(error));
      // act
      const actual$ = service.getAuthUrl$();
      // assert
      actual$.subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toEqual(error);
        },
      });
    });
  });

  describe("getTokenInfo$", () => {
    it("should return valid data", () => {
      const token = {
        accessToken: "string",
        refreshToken: "string",
        tokenType: "string",
        expiresIn: 1,
        userId: "string",
        email: "string",
        displayName: "string",
        firstLoginDate: {},
      };
      // arrange
      const expected = "success";
      const code = "12345";
      const cy = jest.spyOn(backendService, "getUrlToken").mockReturnValue(of(token));
      // act
      const actual$ = service.getTokenInfo$(code);
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(cy).toHaveBeenCalled();
          expect(actual.return).toEqual(expected);
        },
        error: (err) => fail(err),
      });
    });
    it("should getUrlToken throws error", () => {
      // arrange
      const error = { status: 404 };
      jest.spyOn(backendService, "getUrlToken").mockReturnValue(throwError(error));
      // act
      const actual$ = service.getTokenInfo$("12345");
      // assert
      actual$.subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toEqual(error);
        },
      });
    });
  });

  describe("getUserInfo$", () => {
    it("should return valid data", () => {
      const token = {
        userId: "string",
        email: "string",
        displayName: "string",
        firstLoginDate: {},
      };
      // arrange
      const expected = "success";
      const cy = jest.spyOn(backendService, "getUserInfo").mockReturnValue(of(token));
      // act
      const actual$ = service.getUserInfo$(3);
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(cy).toHaveBeenCalled();
          expect(actual.return).toEqual(expected);
        },
        error: (err) => fail(err),
      });
    });
    it("should return valid data is APPLICATION_ID = 0", () => {
      const token = {
        userId: "string",
        email: "string",
        displayName: "string",
        firstLoginDate: {},
      };
      // arrange
      const expected = "success";
      const cy = jest.spyOn(backendService, "getUserInfo").mockReturnValue(of(token));
      // act
      const actual$ = service.getUserInfo$(0);
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(cy).toHaveBeenCalled();
          expect(actual.return).toEqual(expected);
        },
        error: (err) => fail(err),
      });
    });
    it("should getUserInfo throws error", () => {
      // arrange
      const error = { status: 404 };
      jest.spyOn(backendService, "getUserInfo").mockReturnValue(throwError(error));
      // act
      const actual$ = service.getUserInfo$();
      // assert
      actual$.subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toEqual(error);
        },
      });
    });
  });

  describe("changePassword$", () => {
    it("should return valid data", () => {
      const email = "luckstart@gmail.com";
      const cy = jest.spyOn(backendService, "postChangePassword").mockReturnValue(of({}));
      // act
      const actual$ = service.postChangePassword$(email);
      // assert
      actual$.subscribe({
        next: () => {
          expect(cy).toHaveBeenCalled();
        },
      });
    });

    it("should postChangePassword throws error", () => {
      // arrange
      const error = { status: 404 };
      const email = "luckstart@gmail.com";
      jest.spyOn(backendService, "postChangePassword").mockReturnValue(throwError(error));
      // act
      const actual$ = service.postChangePassword$(email);

      // assert
      actual$.subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toEqual(error);
        },
      });
    });
  });

  describe("postLogout$", () => {
    it("should return success", () => {
      // arrange
      const cy = jest.spyOn(backendService, "postLogout").mockReturnValue(of({}));
      // act
      const actual$ = service.postLogout$();
      // assert
      actual$.subscribe({
        next: () => {
          expect(cy).toHaveBeenCalled();
        },
        error: (err) => fail(err),
      });
    });
    it("should postLogout throws error", () => {
      // arrange
      const error = { status: 404 };
      jest.spyOn(backendService, "postLogout").mockReturnValue(throwError(error));
      // act
      const actual$ = service.postLogout$();
      // assert
      actual$.subscribe({
        next: () => fail(),
        error: (err) => {
          expect(err).toEqual(error);
        },
        complete: () => fail(),
      });
    });
  });

  describe("putUserSettings$", () => {
    it("should return valid data", () => {
      const value = "ja";
      // arrange
      const expected = "success";
      const cy = jest.spyOn(backendService, "putUserSettings").mockReturnValue(of(true));
      // act
      const actual$ = service.putUserSettings$(value, 3);
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(cy).toHaveBeenCalledWith({ value }, Constant.LANG_SETTING_KEY, 3);
          expect(actual.return).toEqual(expected);
        },
        error: (err) => fail(err),
      });
    });
    it("should return not pass APPLICATION_ID", () => {
      const value = "ja";
      // arrange
      const expected = "success";
      const cy = jest.spyOn(backendService, "putUserSettings").mockReturnValue(of(true));
      // act
      const actual$ = service.putUserSettings$(value);
      // assert
      actual$.subscribe({
        next: (actual) => {
          expect(cy).toHaveBeenCalledWith({ value }, Constant.LANG_SETTING_KEY, Constant.APPLICATION_ID);
          expect(actual.return).toEqual(expected);
        },
        error: (err) => fail(err),
      });
    });
    it("should putUserSettings throws error", () => {
      // arrange
      const value = "ja";
      const error = { status: 404 };
      jest.spyOn(backendService, "putUserSettings").mockReturnValue(throwError(error));
      // act
      const actual$ = service.putUserSettings$(value, 3);
      // assert
      actual$.subscribe({
        next: () => {},
        error: (err) => {
          expect(err).toEqual(error);
        },
      });
    });
  });
});
