import { HttpErrorResponse } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { BackendService } from "./backend.service";
import { FirstLogin, IUser, Store, User } from "./backend.service.model";
import { Constant } from "../../app.constant";

import EndPoint from "./end-point.constant";

const errorResponses = [
  {
    title: "should emit a error event when got 400 response",
    opts: { status: 400, statusText: "Bad request" },
  },
  {
    title: "should emit a error event when got 401 response",
    opts: { status: 401, statusText: "Not authenticated" },
  },
  {
    title: "should emit a error event when got 500 response",
    opts: { status: 500, statusText: "Internal Server error." },
  },
];

describe("BackendService", () => {
  let service: BackendService;
  let http: HttpTestingController;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    })
  );

  beforeEach(() => {
    service = TestBed.inject(BackendService);
    http = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    service = TestBed.inject(BackendService);
    expect(service).toBeTruthy();
  });

  describe("getLogin", () => {
    it("get url", () => {
      // arrange
      const url = EndPoint.LOGIN + "?redirectUrl=";

      // act
      // assert

      service.getLogin("").subscribe({
        next: (actual) => expect(actual).toEqual(url),
        error: (err) => fail(err),
      });

      // act
      http
        .expectOne({
          url: `${url}`,
          method: "GET",
        })
        .flush([]);

      // assert
      http.verify();
    });

    it("return error", () => {
      const opts = { status: 400, statusText: "Bad request" };
      service.getLogin("").subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
        },
        complete: () => fail("should return error"),
      });
      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);
      http.verify();
    });
  });

  describe("get Url Token", () => {
    it("should return url not pass code", () => {
      // arrange
      const url =
        EndPoint.GET_TOKEN +
        "?applicationId=" +
        Constant.APPLICATION_ID +
        "&" +
        "redirectUrl=";
      // act
      // assert

      service.getUrlToken(Constant.APPLICATION_ID, "", "").subscribe({
        next: (actual) => expect(actual).toEqual(url),

        error: (err) => fail(err),
      });

      // act
      http
        .expectOne({
          url: `${url}`,
          method: "GET",
        })
        .flush([]);

      // assert
      http.verify();
    });
    it("should return url pass code", () => {
      // arrange
      const url =
        EndPoint.GET_TOKEN +
        "?applicationId=" +
        Constant.APPLICATION_ID +
        "&redirectUrl=redirectUrl&code=code";
      // act
      // assert

      service
        .getUrlToken(Constant.APPLICATION_ID, "redirectUrl", "code")
        .subscribe({
          next: (actual) => expect(actual).toEqual(url),
          error: (err) => fail(err),
        });

      // act
      http
        .expectOne({
          url: `${url}`,
          method: "GET",
        })
        .flush([]);

      // assert
      http.verify();
    });

    it("return error", () => {
      const opts = { status: 400, statusText: "Bad request" };
      service.getUrlToken(Constant.APPLICATION_ID, "", "").subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
        },
        complete: () => fail("should return error"),
      });
      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);
      http.verify();
    });
  });

  describe("getUserInfo()", () => {
    it("should  getUserInfo API success", () => {
      // arrange
      const url = EndPoint.USER_INFO + "?applicationId=3";

      service.getUserInfo(3).subscribe({
        next: (actual) => expect(actual).toEqual(url),
        error: (err) => fail(err),
      });

      // act
      http.expectOne({ url: `${url}`, method: "get" }).flush([]);
      // assert
      http.verify();
    });
    it("should getUserInfo API error", () => {
      // arrange
      const opts = { status: 400, statusText: "Bad request" };
      service.getUserInfo(3).subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
        },
        complete: () => fail("should return error"),
      });
      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);

      // assert
      http.verify();
    });
  });

  describe("putFirstLoginUser()", () => {
    it("should send PUT request to termConditions task API", (done) => {
      // arrange
      const bodyRequest: FirstLogin = {
        applicationId: Constant.APPLICATION_ID,
        email: "sample1@test.co.jp",
        firstLoginDate: "2019-01-01T01:02:03+09:00",
      };

      service.putFirstLoginUser(bodyRequest).subscribe({
        error: (err) => fail(err),
        complete: () => done(),
      });

      // act
      http
        .expectOne({ url: `${EndPoint.FIRST_LOGIN}`, method: "PUT" })
        .flush([]);

      // assert
      http.verify();
    });

    errorResponses.forEach((c) => {
      it(c.title, (done) => {
        // arrange
        const bodyRequest: FirstLogin = {
          applicationId: Constant.APPLICATION_ID,
          email: "sample1@test.co.jpsssss",
          firstLoginDate: "2019-01-01T01:02:03+09:00",
        };
        service.putFirstLoginUser(bodyRequest).subscribe({
          // assert
          next: (data) => fail(`should not return any data, but got ${data}`),
          error: (error) => {
            expect(error).toBeInstanceOf(HttpErrorResponse);
            done();
          },
          complete: () => fail("should return error"),
        });

        // act
        http.expectOne({}).error(new ErrorEvent("error"), c.opts);
        http.verify();
      });
    });
  });

  describe("changePassword", () => {
    it("return data", () => {
      // arrange
      const url = EndPoint.CHANGE_PASSWORD;
      const email = "lucky@gmail.com";
      const res = {
        email: "sample@test.com",
      };
      // act
      // assert
      service.postChangePassword(email).subscribe({
        next: (actual) => expect(actual).toEqual(res),
        error: (err) => fail(err),
      });
      http.expectOne({ url: `${url}`, method: "post" }).flush([]);
    });
  });

  describe("get Url Token", () => {
    it("should return url not pass code", () => {
      // arrange
      const url =
        EndPoint.GET_TOKEN +
        "?applicationId=" +
        Constant.APPLICATION_ID +
        "&" +
        "redirectUrl=";
      // act
      // assert

      service.getUrlToken(Constant.APPLICATION_ID, "", "").subscribe({
        next: (actual) => expect(actual).toEqual(url),

        error: (err) => fail(err),
      });

      // act
      http
        .expectOne({
          url: `${url}`,
          method: "GET",
        })
        .flush([]);

      // assert
      http.verify();
    });
    it("should return url pass code", () => {
      // arrange
      const url =
        EndPoint.GET_TOKEN +
        "?applicationId=" +
        Constant.APPLICATION_ID +
        "&redirectUrl=redirectUrl&code=code";
      // act
      // assert

      service
        .getUrlToken(Constant.APPLICATION_ID, "redirectUrl", "code")
        .subscribe({
          next: (actual) => expect(actual).toEqual(url),
          error: (err) => fail(err),
        });

      // act
      http
        .expectOne({
          url: `${url}`,
          method: "GET",
        })
        .flush([]);

      // assert
      http.verify();
    });

    it("return error", () => {
      const opts = { status: 400, statusText: "Bad request" };
      service.getUrlToken(Constant.APPLICATION_ID, "", "").subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
        },
        complete: () => fail("should return error"),
      });
      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);
      http.verify();
    });
  });

  describe("postLogout()", () => {
    it("should send Post request to logout API success", () => {
      // arrange
      const url = EndPoint.LOG_OUT;

      service.postLogout().subscribe({
        next: (actual) => expect(actual).toEqual(url),
        error: (err) => fail(err),
      });

      // act
      http.expectOne({ url: `${url}`, method: "post" }).flush([]);
      // assert
      http.verify();
    });

    it("should send Post request to logout API error", () => {
      // arrange
      const opts = { status: 400, statusText: "Bad request" };
      service.postLogout().subscribe({
        // assert
        next: (data) => fail(`should not return any data, but got ${data}`),
        error: (error) => {
          expect(error).toBeInstanceOf(HttpErrorResponse);
        },
        complete: () => fail("should return error"),
      });

      // act
      http.expectOne({}).error(new ErrorEvent("error"), opts);

      // assert
      http.verify();
    });
  });
});
