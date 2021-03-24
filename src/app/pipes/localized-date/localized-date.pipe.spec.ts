jest.mock("@ngx-translate/core");

import { TestBed } from "@angular/core/testing";
import { DateAdapter } from "@angular/material/core";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { TranslateService } from "@ngx-translate/core";
import moment from "moment";

import { LocalizedDatePipe } from "./localized-date.pipe";

describe("LocalizedDatePipe", () => {
  let translate: TranslateService;
  let adapter: DateAdapter<moment.Moment>;
  let pipe: LocalizedDatePipe;
  const date = "2020-08-10T12:46:15Z";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedDatePipe, TranslateService, { provide: DateAdapter, useClass: MomentDateAdapter }],
    });
  });

  beforeEach(() => {
    translate = undefined;
    adapter = TestBed.inject(DateAdapter);
    pipe = new LocalizedDatePipe(translate, adapter);
  });

  it("should create LocalizedDatePipe", () => {
    expect(pipe).toBeTruthy();
  });

  describe("transform", () => {
    it("should transform default", () => {
      // arrange
      const expected = moment("2020-08-10T12:46:15Z").format("MMM D, YYYY, h:mm:ss A");

      // act
      const actual = pipe.transform(date);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should transform null", () => {
      // arrange
      const expected = "";
      // act
      const actual = pipe.transform(null);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should transform value", () => {
      // arrange
      const expected = "any";
      // act
      const actual = pipe.transform("any");
      // assert
      expect(actual).toEqual(expected);
    });
  });
});

describe("LocalizedDatePipe", () => {
  let translate: TranslateService;
  let adapter: DateAdapter<moment.Moment>;
  let pipe: LocalizedDatePipe;
  const date = "2020-08-10T12:46:15Z";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalizedDatePipe, TranslateService, { provide: DateAdapter, useClass: MomentDateAdapter }],
    });
  });

  beforeEach(() => {
    translate = TestBed.inject(TranslateService);
    adapter = TestBed.inject(DateAdapter);
    pipe = new LocalizedDatePipe(translate, adapter);
  });

  it("should create LocalizedDatePipe", () => {
    expect(pipe).toBeTruthy();
  });

  describe("transform", () => {
    it("should transform default", () => {
      // arrange
      const expected = moment("2020-08-10T12:46:15Z").format("MMM D, YYYY, h:mm:ss A");

      // act
      const actual = pipe.transform(date);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should transform null", () => {
      // arrange
      const expected = "";
      // act
      const actual = pipe.transform(null);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should transform value", () => {
      // arrange
      const expected = "any";
      // act
      const actual = pipe.transform("any");
      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe("getValidDateTimeOrNull", () => {
    it("should return null", () => {
      // arrange
      const data = "any";
      // act
      const actual = pipe["getValidDateTimeOrNull"](data);
      // assert
      expect(actual).toBeNull();
    });

    it("should return null", () => {
      // arrange
      const data = null;
      // act
      const actual = pipe["getValidDateTimeOrNull"](data);
      // assert
      expect(actual).toBeNull();
    });
  });
});
