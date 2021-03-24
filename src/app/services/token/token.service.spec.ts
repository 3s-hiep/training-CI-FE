jest.mock("../user-auth/user-auth.service");

import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of, throwError } from "rxjs";
import * as mockUtils from "../../components/utils";
import { UserAuthService } from "../user-auth/user-auth.service";
import { TokenService } from "./token.service";

const sessionStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => {
      return store[key] || null;
    },
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
});

const userTestData = {
  displayName: "test_dname",
  email: "test@email.com",
  userId: "test_userid",
  firstLoginDate: "first_login_date",
  language: "",
};
const mockApiReturn = {
  userId: "a638bfa0-099d-41c3-a840-fa3e9897953a",
  email: "sample@test.com",
  displayName: "User Name",
  firstLoginDate: "2019-01-01T01:01:01.000Z",
  language: "",
};
const InitialInfo = {
  user: {
    displayName: "",
    email: "",
    userId: "",
    firstLoginDate: "",
    language: "",
  },
};

class MockComponent {
  public title;
  public subtitle;
  public buttons;
  public tag;
}
describe("TokenService", () => {
  let token: TokenService;
  let auth: jest.Mocked<UserAuthService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService],
      imports: [RouterTestingModule.withRoutes([{ path: "term-conditions", component: MockComponent }])],
    });
    token = TestBed.inject(TokenService);
    auth = TestBed.inject(UserAuthService) as jest.Mocked<UserAuthService>;
    Date.now = jest.fn().mockReturnValue(10000);
  });
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.restoreAllMocks();
  });
  it("should be created", () => {
    token = TestBed.inject(TokenService);
    expect(token).toBeTruthy();
  });

  describe("setAuthCode", () => {
    it("should set code", () => {
      // arrange
      const code = "test_code";
      // act
      token.setAuthCode(code);
      // assert
      expect(token.code).toEqual(code);
    });
  });

  describe("getUserInfo", () => {
    it("should return token data for IBM cloud", () => {
      // arrange
      token.info.user = Object.assign({}, userTestData);
      // act
      // assert
      expect(token.getUserInfo()).toEqual(userTestData);
    });
  });

  describe("refresh", () => {
    it("should be set data from session storage", () => {
      // arrange
      sessionStorage.setItem("firstLoginDate", userTestData.firstLoginDate);
      sessionStorage.setItem("displayName", userTestData.displayName);
      sessionStorage.setItem("email", userTestData.email);
      sessionStorage.setItem("userId", userTestData.userId);
      sessionStorage.setItem("language", userTestData.language);
      // act
      token.refresh();
      // assert
      expect(token.getUserInfo()).toEqual({
        firstLoginDate: userTestData.firstLoginDate,
        displayName: userTestData.displayName,
        email: userTestData.email,
        userId: userTestData.userId,
        language: "",
      });
    });
  });
  describe("clear", () => {
    it("should be clear info", () => {
      // arrange
      sessionStorage.setItem("firstLoginDate", userTestData.firstLoginDate);
      sessionStorage.setItem("displayName", userTestData.displayName);
      sessionStorage.setItem("email", userTestData.email);
      sessionStorage.setItem("userId", userTestData.userId);
      sessionStorage.setItem("language", userTestData.language);
      // act
      token.clear();
      // assert
      expect(token.info).toEqual(InitialInfo);
    });
    it("should be clear data from session storage", () => {
      // arrange

      token.info.user = Object.assign({}, userTestData);
      sessionStorage.setItem("firstLoginDate", userTestData.firstLoginDate);
      sessionStorage.setItem("displayName", userTestData.displayName);
      sessionStorage.setItem("email", userTestData.email);
      sessionStorage.setItem("userId", userTestData.userId);
      sessionStorage.setItem("language", userTestData.language);
      // act
      token.clear();
      // assert
      expect(sessionStorage.getItem("firstLoginDate")).toEqual(null);
    });
  });
  describe("checkToken", () => {
    it("should return true have sessionId", (done) => {
      // arrange
      token.storeToken(mockApiReturn);
      jest.spyOn(mockUtils, "getCookie").mockReturnValue("dummy");
      auth.getTokenInfo$.mockReturnValue(of({}));
      // act
      token.checkToken("dummy").subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
        done();
      });
    });
    it("should return doLogin's result", (done) => {
      // arrange
      token.info = JSON.parse(JSON.stringify(InitialInfo));
      jest.spyOn(token, "doLogin").mockReturnValue(of(true));
      // act
      token.checkToken("dummy").subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
        done();
      });
    });
    it("should return false without code", (done) => {
      // arrange
      token.info = JSON.parse(JSON.stringify(InitialInfo));
      // act
      token.checkToken("").subscribe((res) => {
        // assert
        expect(res).toBeFalsy();
        done();
      });
    });
  });
  describe("doLogin", () => {
    it("should return true", () => {
      // // arrange
      auth.getTokenInfo$.mockReturnValue(of({}));
      const spy = jest.spyOn(token, "handleGetUserInfo");
      // act
      token.doLogin().subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
        expect(spy).toHaveBeenCalled();
      });
    });

    it("should throw Error", (done) => {
      // arrange
      const err = new Error("dummy error");
      auth.getTokenInfo$.mockReturnValue(throwError(err));
      // act
      token.doLogin().subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toEqual(err);
          done();
        },
        complete: () => fail("should return error"),
      });
    });
  });

  describe("storeToken", () => {
    it("should be set data save", () => {
      // arrange
      const spy = jest.spyOn(token.router, "navigate");
      // act
      token.storeToken(mockApiReturn);
      // assert
      expect(token.info).toEqual({
        user: {
          displayName: mockApiReturn.displayName,
          email: mockApiReturn.email,
          userId: mockApiReturn.userId,
          firstLoginDate: mockApiReturn.firstLoginDate,
          language: mockApiReturn.language,
        },
      });
      expect(spy).not.toBeCalled();
    });
    it("should be set data to session storage goto term-conditions page", () => {
      // arrange
      // act
      const spy = jest.spyOn(token.router, "navigate");
      token.storeToken({ displayName: mockApiReturn.displayName, email: mockApiReturn.email, userId: mockApiReturn.userId });

      // assert
      expect(token.info).toEqual({
        user: {
          displayName: mockApiReturn.displayName,
          email: mockApiReturn.email,
          userId: mockApiReturn.userId,
          firstLoginDate: "",
          language: "",
        },
      });
      expect(spy).toBeCalled();
    });
  });

  describe("checkAppPermission", () => {
    it("should return false when app_valid_time is empty", () => {
      // arrange
      sessionStorage.setItem("app_valid_time", "");
      // assert
      expect(token.checkAppPermission()).toBeFalsy();
    });
    it("should return false when appValidTime is expired", () => {
      // arrange
      sessionStorage.setItem("app_valid_time", "9");
      // assert
      expect(token.checkAppPermission()).toBeFalsy();
    });
    it("should return true", () => {
      // arrange
      sessionStorage.setItem("app_valid_time", "11");
      // assert
      expect(token.checkAppPermission()).toBeTruthy();
    });
  });

  describe("changePassword", () => {
    it("should return true", (done) => {
      // arrange
      token.info = JSON.parse(JSON.stringify(InitialInfo));
      const response = {
        email: "tetst@test.com",
        active: true,
      };
      auth.postChangePassword$.mockReturnValue(of(response));
      // act
      token.changePassword().subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
        done();
      });
    });
    it("should throw Error", (done) => {
      // arrange
      token.info = JSON.parse(JSON.stringify(InitialInfo));
      const err = new Error("dummy error");
      auth.postChangePassword$.mockReturnValue(throwError(err));
      // act
      token.changePassword().subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toEqual(err);
          done();
        },
        complete: () => fail("should return error"),
      });
    });
  });

  describe("handleGetUserInfo", () => {
    it("should return true have sessionId", () => {
      token.info.user.firstLoginDate = null;
      token.info.user.userId = null;
      token.info.user.email = null;
      token.info.user.displayName = null;
      // arrange
      auth.getUserInfo$.mockReturnValue(of({}));
      // act
      token.handleGetUserInfo().subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
      });
    });
    it("should return doLogin's result", () => {
      // arrange
      sessionStorage.setItem("userId", "sample");
      auth.getUserInfo$.mockReturnValue(of({}));
      // act
      token.handleGetUserInfo().subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
      });
    });
    it("should throw Error", (done) => {
      token.info.user.firstLoginDate = null;
      token.info.user.userId = null;
      token.info.user.email = null;
      token.info.user.displayName = null;
      // arrange
      const err = new Error("dummy error");
      auth.getUserInfo$.mockReturnValue(throwError(err));
      // act
      token.handleGetUserInfo().subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toEqual(err);
          done();
        },
        complete: () => fail("should return error"),
      });
    });

    it("should set the languages ", () => {
      token.info.user.firstLoginDate = "";
      token.info.user.language = "";
      auth.getUserInfo$.mockReturnValue(of({}));
      token.handleGetUserInfo().subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
      });
    });
    it("should set the languages==`` ", () => {
      token.info.user.email = "e";
      token.info.user.displayName = "e";
      token.info.user.userId = "e";
      token.info.user.language = "e";
      token.info.user.firstLoginDate = "e";
      auth.getUserInfo$.mockReturnValue(of({}));
      token.handleGetUserInfo().subscribe((res) => {
        // assert
        expect(res).toBeTruthy();
      });
    });
  });
});
