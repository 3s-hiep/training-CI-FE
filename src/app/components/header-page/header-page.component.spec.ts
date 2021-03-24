import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { HeaderPageComponent } from "./header-page.component";
import { HeaderPagerModule } from "./header-page.module";

describe("HeaderPageComponent", () => {
  let component: HeaderPageComponent;
  let fixture: ComponentFixture<HeaderPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderPagerModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPageComponent);
    component = fixture.componentInstance;
    component.title = "TEST";
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("should be send page title", () => {
    it("On send title is TEST", () => {
      // arrange

      // act
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css(`[data-test=header-page-title]`));
      // assert
      expect(content.nativeElement.textContent).toBe("TEST");
    });
  });
});
