import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { SystemErrorComponent, SystemError } from "./system-error.component";
import { SystemErrorModule } from "./system-error.module";

describe("SystemErrorComponent", () => {
  let component: SystemErrorComponent;
  let fixture: ComponentFixture<SystemErrorComponent>;
  const systemErrorSample: SystemError = {
    level: "critical",
    title: "some error",
    content: "there is an error. contact to admin.",
    links: [
      {
        text: "back to portal",
        url: "/some-page",
      },
      {
        text: "login",
        url: "/login-page",
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SystemErrorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("With error", () => {
    it("should display error icon", () => {
      // arrange
      component.errorData = systemErrorSample;
      // act
      fixture.detectChanges();
      const iconElement = fixture.debugElement.query(By.css("cie-svg-icon img"));
      // assert
      expect(iconElement).toBeTruthy();
      expect(iconElement.properties.alt).toEqual("error");
    });

    it("should display warning icon", () => {
      // arrange
      component.errorData = {
        level: "warning",
        title: "some warning",
        content: "waning text",
      };
      // act
      fixture.detectChanges();
      const iconElement = fixture.debugElement.query(By.css("cie-svg-icon img"));
      // assert
      expect(iconElement).toBeTruthy();
      expect(iconElement.properties.alt).toEqual("caution");
    });

    it("should not display icon without level", () => {
      // arrange
      component.errorData = {
        title: "some warning",
        content: "waning text",
      };
      // act
      fixture.detectChanges();
      const iconElement = fixture.debugElement.query(By.css("cie-svg-icon img"));
      // assert
      expect(iconElement).toBeFalsy();
    });

    it("should display error title", () => {
      // arrange
      component.errorData = systemErrorSample;
      // act
      fixture.detectChanges();
      const title = fixture.debugElement.query(By.css(".title"));
      // assert
      expect(title.nativeElement.textContent).toBe(systemErrorSample.title);
    });

    it("should display error message", () => {
      // arrange
      component.errorData = systemErrorSample;
      // act
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css(".content"));
      // assert
      expect(content.nativeElement.textContent).toBe(systemErrorSample.content);
    });

    it("should not display link", () => {
      // arrange
      component.errorData = {
        title: "some title",
        content: "test text",
      };
      // act
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css(".link"));

      // assert
      expect(link).toBeNull();
    });

    it("should display link", () => {
      // arrange
      component.errorData = systemErrorSample;
      // act
      fixture.detectChanges();
      const link = fixture.debugElement.query(By.css(".link"));

      // assert
      expect(link).not.toBeNull();
    });
  });

  describe("getIconColor", () => {
    it("should return red color when critical", () => {
      // arrange
      const level = "critical";
      const expectedColor = "red";
      // act
      const actual = component.getIconColor(level);
      // assert
      expect(actual).toEqual(expectedColor);
    });

    it("should return yellow color when warning", () => {
      // arrange
      const level = "warning";
      const expectedColor = "yellow";
      // act
      const actual = component.getIconColor(level);
      // assert
      expect(actual).toEqual(expectedColor);
    });
    it("should return info color when info", () => {
      // arrange
      const level = "info";
      const expectedColor = "blue";
      // act
      const actual = component.getIconColor(level);
      // assert
      expect(actual).toEqual(expectedColor);
    });
    it("should return default style", () => {
      // arrange
      const level = "";
      const expectedColor = "";
      // act
      const actual = component.getIconColor(level);
      // assert
      expect(actual).toEqual(expectedColor);
    });
  });
});
