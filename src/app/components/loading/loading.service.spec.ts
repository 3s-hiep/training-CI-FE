import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { MatDialog } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import * as moment from "moment";

import { LoadingService } from "./loading.service";
import { LoadingComponent } from "./loading.component";

describe(LoadingService.name, () => {
  let service: LoadingService;

  let matDialogMock;
  let toastrServiceMock;
  let translateServiceMock;

  beforeEach(() => {
    matDialogMock = {
      open: jest.fn(() => {
        return {
          close: jest.fn(),
        };
      }),
      closeAll: jest.fn(),
    };

    toastrServiceMock = {
      error: jest.fn(),
    };

    translateServiceMock = {
      instant: jest.fn(() => ""),
    };

    TestBed.configureTestingModule({
      providers: [
        LoadingService,
        [
          { provide: MatDialog, useValue: matDialogMock },
          { provide: ToastrService, useValue: toastrServiceMock },
          { provide: TranslateService, useValue: translateServiceMock },
        ],
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(LoadingService);

    service.tokens = {
      timeout: {
        title: "ti-ti",
        message: "ti-me",
      },
    };
    service.dialogRef = {
      close: jest.fn(),
    };
  });

  describe("open", () => {
    it("should open dialog", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.open();

      // assert
      expect(matDialogMock.open).toHaveBeenCalledWith(LoadingComponent, { disableClose: true });
      expect(service.timeoutTimer$).toHaveBeenCalled();
    });

    it("should not open dialog when already open", () => {
      // arrange
      service.isOpen = true;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.open();

      // assert
      expect(matDialogMock.open).not.toHaveBeenCalled();
      expect(service.timeoutTimer$).toHaveBeenCalled();
    });
  });

  describe("openWithoutTimeout", () => {
    it("should open dialog", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.openWithoutTimeout();

      // assert
      expect(matDialogMock.open).toHaveBeenCalledWith(LoadingComponent, { disableClose: true });
      expect(service.timeoutTimer$).not.toHaveBeenCalled();
    });

    it("should not open dialog when already open", () => {
      // arrange
      service.isOpen = true;
      jest.spyOn(service, "timeoutTimer$").mockReturnValue(of(null));

      // act
      service.openWithoutTimeout();

      // assert
      expect(matDialogMock.open).not.toHaveBeenCalled();
      expect(service.timeoutTimer$).not.toHaveBeenCalled();
    });
  });

  describe("close", () => {
    it("should close dialog", fakeAsync(() => {
      // arrange
      service.isOpen = true;
      service.countOpenLoading = 0;
      service.timeout = {} as any;

      // act
      service.close();
      tick(500);
      // assert
      const spy = jest.spyOn(service.dialogRef, "close");
      expect(spy).toHaveBeenCalled();
    }));
    it("should not close dialog when already close", fakeAsync(() => {
      // arrange
      service.isOpen = false;
      service.timeout = null;
      service.countOpenLoading = 0;

      // act
      service.close();
      tick(500);
      // assert
      expect(matDialogMock.closeAll).not.toHaveBeenCalled();
    }));
    it("should not close dialog countOpenLoading > 0", fakeAsync(() => {
      // arrange
      service.isOpen = true;
      service.timeout = null;
      service.countOpenLoading = 3;
      // act
      service.close();
      tick(500);
      // assert
      expect(matDialogMock.closeAll).not.toHaveBeenCalled();
    }));
    it("should not close dialog countOpenLoading < 0", () => {
      // arrange
      service.isOpen = true;
      service.timeout = null;
      service.countOpenLoading = -1;
      // act
      service.close();
      expect(service.countOpenLoading).toBe(0);
      // assert
    });
  });

  describe("timeoutTimer$", () => {
    it("should close dialog when timeout", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(translateServiceMock, "instant").mockReturnValueOnce("tata");
      jest.spyOn(translateServiceMock, "instant").mockReturnValueOnce("meme");

      const openTime = moment.utc("1234-05-06 12:34:56.000");
      const serviceMock = new LoadingService({} as any, {} as any, {} as any);
      serviceMock.timeoutTime = 0;
      serviceMock.isOpen = true;
      serviceMock.openTime = openTime;
      serviceMock.translateService = service.translateService;
      serviceMock.toastrService = service.toastrService;
      serviceMock.tokens = service.tokens;
      serviceMock.close = jest.fn();
      // act
      return service
        .timeoutTimer$(openTime, serviceMock)
        .toPromise()
        .then(() => {
          // assert
          expect(translateServiceMock.instant).toHaveBeenNthCalledWith(1, "ti-ti");
          expect(translateServiceMock.instant).toHaveBeenNthCalledWith(2, "ti-me");
          expect(serviceMock.toastrService.error).toHaveBeenCalledWith("meme", "tata", {
            closeButton: true,
            timeOut: 3000,
          });
          expect(serviceMock.close).toHaveBeenCalled();
        })
        .catch(() => fail);
    });

    it("should not close dialog when timeout but not open", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(translateServiceMock, "instant").mockReturnValueOnce("tata");
      jest.spyOn(translateServiceMock, "instant").mockReturnValueOnce("meme");

      const openTime = moment.utc("1234-05-06 12:34:56");
      const serviceMock = new LoadingService({} as any, {} as any, {} as any);
      serviceMock.timeoutTime = 0;
      serviceMock.isOpen = false;
      serviceMock.openTime = moment.utc("1234-05-06 12:34:56");
      serviceMock.close = jest.fn();
      // act
      return service
        .timeoutTimer$(openTime, serviceMock)
        .toPromise()
        .then(() => {
          // assert
          expect(serviceMock.close).not.toHaveBeenCalled();
        })
        .catch(() => fail);
    });

    it("should not close dialog when other timeoutTimer", () => {
      // arrange
      service.isOpen = false;
      jest.spyOn(translateServiceMock, "instant").mockReturnValueOnce("tata");
      jest.spyOn(translateServiceMock, "instant").mockReturnValueOnce("meme");

      const openTime = moment.utc("1234-05-06 12:34:56");
      const serviceMock = new LoadingService({} as any, {} as any, {} as any);
      serviceMock.timeoutTime = 0;
      serviceMock.isOpen = true;
      serviceMock.openTime = moment.utc("1234-05-06 12:34:57");
      serviceMock.close = jest.fn();
      // act
      return service
        .timeoutTimer$(openTime, serviceMock)
        .toPromise()
        .then(() => {
          // assert
          expect(serviceMock.close).not.toHaveBeenCalled();
        })
        .catch(() => fail);
    });
  });
  describe("plusCountLoading and minusCountLoading", () => {
    it("should be call plusCountLoading", () => {
      service.countOpenLoading = 0;
      service.plusCountLoading();
      expect(service.countOpenLoading).toBe(1);
    });
    it("should be call minusCountLoading", () => {
      service.countOpenLoading = 1;
      service.minusCountLoading();
      expect(service.countOpenLoading).toBe(0);
    });
  });
});
