import { HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TestBed, inject } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import * as mockUtils from "../../components/utils";
import { CredentialsService } from "./credentials.service";

class MockComponent {
  public title;
  public subtitle;
  public buttons;
  public tag;
}

describe("CredentialsService", () => {
  let service: CredentialsService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: "permission-error", component: MockComponent },
          { path: "credentials-expired", component: MockComponent },
        ]),
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CredentialsService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(CredentialsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be called, withCredentials = false", (done) => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange

      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
        done();
      });

      // assert
      const request = mock.expectOne(() => true);
      request.flush(JSON.stringify({ some: "json" }));
      mock.verify();
    })();
  });

  it("should be called api return not 401 or 403", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange

      // act
      const spy = jest.spyOn(service["router"], "navigate");
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "404",
              description: "Not found",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 404,
        statusText: "Not found",
      });
      mock.verify();
      expect(spy).not.toHaveBeenCalled();
    })();
  });

  it("should be called api return 401", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      jest.spyOn(mockUtils, "getCookie").mockReturnValue("test");
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "401",
              description: "Validation error Authorization.",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 401,
        statusText: "Unauthorized",
      });
      mock.verify();
      expect(spy).toHaveBeenCalledWith(["login"]);
    })();
  });
  it("should be called api return 401 not cookie", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      jest.spyOn(mockUtils, "getCookie").mockReturnValue(null);
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "401",
              description: "Validation error Authorization.",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 401,
        statusText: "Unauthorized",
      });
      mock.verify();
      expect(spy).toHaveBeenCalledWith(["login"]);
    })();
  });
  it("should be called api return 401 not cookie session id", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      jest.spyOn(mockUtils, "getCookie").mockReturnValue(null);
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "401",
              description: "Validation error Authorization.",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 401,
        statusText: "Unauthorized",
      });
      mock.verify();
      expect(spy).toHaveBeenCalled();
    })();
  });

  it("should be called api return 403", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      jest.spyOn(mockUtils, "getCookie").mockReturnValue("getCookie");
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "403",
              description: "Validation error Authorization.",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 403,
        statusText: "Unauthorized",
      });
      mock.verify();
      expect(spy).toHaveBeenCalledWith(["permission-error"]);
    })();
  });

  it("should be called api return 403 not cookie session id", () => {
    inject([HttpClient, HttpTestingController], (http: HttpClient, mock: HttpTestingController) => {
      // arrange
      jest.spyOn(mockUtils, "getCookie").mockReturnValue(null);
      const spy = jest.spyOn(service["router"], "navigate");
      // act
      http.get("/some/api").subscribe((res) => {
        expect(res).toBeTruthy();
      });

      // assert

      const errorInitEvent: ErrorEventInit = {
        message: null,
        error: {
          errors: [
            {
              code: "403",
              description: "Validation error Authorization.",
              message: null,
              link: null,
              additionalinfo: null,
            },
          ],
        },
        lineno: null,
        colno: null,
        filename: null,
      };
      const error = new ErrorEvent("ERROR", errorInitEvent);
      mock.expectOne("/some/api").error(error, {
        status: 403,
        statusText: "Unauthorized",
      });
      mock.verify();
      expect(spy).not.toHaveBeenCalled();
    })();
  });
});
