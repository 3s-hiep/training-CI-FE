jest.mock("../../../assets/i18n/tokens.json");

import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS, HttpClient, HttpResponse } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import { ToastrModule, ToastrService } from "ngx-toastr";

import { NotificationService } from "./notification.service";

describe("CredentialsService", () => {
  let service: NotificationService;
  let toastrService: ToastrService;
  let http: HttpTestingController;
  let httpClient: HttpClient;
  let translateServiceMock;
  beforeEach(() => {
    translateServiceMock = {
      instant: jest.fn(() => ""),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        ToastrService,
        { provide: TranslateService, useValue: translateServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: NotificationService,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(NotificationService);
    toastrService = TestBed.inject(ToastrService);
    http = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

    service.tokens = {
      error: {
        title: "er-ti",
        message: "er-me",
      },
      success: {
        title: "er-ti",
        message: "er-me",
      },
    };
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should catch 401", (done) => {
    // arrange

    // act
    httpClient.get("/error").subscribe(
      () => {},
      () => {
        done();
      },
    );
    // assert
    http.expectOne("/error").error(new ErrorEvent("Unauthorized error"), {
      status: 401,
    });
    http.verify();
  });

  it("should write a console log with error status", (done) => {
    spyOn(console, "log");
    spyOn(toastrService, "error");
    httpClient.get("/error").subscribe(
      () => {},
      () => {
        done();
      },
    );
    http.expectOne("/error").error(new ErrorEvent("Unauthorized error"), {
      status: 401,
    });
    http.verify();
    expect(toastrService.error).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

  it("show message when the request had method DELETE or PUT and response 404 ", (done) => {
    spyOn(console, "log");
    httpClient.delete("/error").subscribe(
      () => {},
      () => {
        done();
      },
    );
    http.expectOne("/error").error(new ErrorEvent("Unauthorized error"), {
      status: 404,
    });
    http.verify();
    expect(console.log).toHaveBeenCalled();
  });

  it("should not call toastrService.error when error status(404)", (done) => {
    spyOn(toastrService, "error");
    httpClient.get("/error").subscribe(
      () => {},
      () => {
        done();
      },
    );
    http.expectOne("/error").error(new ErrorEvent("test error"), {
      status: 404,
    });
    http.verify();
    expect(toastrService.error).not.toHaveBeenCalled();
  });
  it("should with error status", (done) => {
    spyOn(console, "log");
    spyOn(toastrService, "error");
    httpClient.get("/error").subscribe(
      () => {},
      () => {
        done();
      },
    );
    http.expectOne("/error").error(new ErrorEvent("Service Error"), {
      status: 500,
    });
    http.verify();
    expect(toastrService.error).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

  it("should not call toastrService.error when error status(403)", (done) => {
    spyOn(toastrService, "error");
    httpClient.get("/error").subscribe(
      () => {},
      () => {
        done();
      },
    );
    http.expectOne("/error").error(new ErrorEvent("test error"), {
      status: 403,
    });
    http.verify();
    expect(toastrService.error).not.toHaveBeenCalled();
  });

  it("should call toastrService.success when success", (done) => {
    spyOn(toastrService, "success");
    httpClient.get("/success").subscribe(
      () => {
        done();
      },
      () => {},
    );
    http.expectOne("/success").event(
      new HttpResponse<any>({ status: 201 }),
    );
    http.verify();
    expect(toastrService.success).toHaveBeenCalled();
  });
});
