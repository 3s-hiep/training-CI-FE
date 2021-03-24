import { ComponentFixture, TestBed } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";

import { UserFilterComponent } from "./user-filter.component";
import { UserFilterModule } from "./user-filter.module";
import { By } from "@angular/platform-browser";

describe("UserFilterComponent", () => {
  let component: UserFilterComponent;
  let fixture: ComponentFixture<UserFilterComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserFilterModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("onClickApply", () => {
    it("should call onClickApply()", () => {
      // arrange
      component.ngOnInit();
      // act
      fixture.detectChanges();
      const okButton = fixture.debugElement.query(By.css("[data-test=ok]"));
      const onSelectingChangeMock = spyOn(component, "onApply");
      okButton.nativeElement.dispatchEvent(new Event("click"));
      fixture.detectChanges();
      // assert
      expect(onSelectingChangeMock).toHaveBeenCalled();
    });
    it("should emit filtered", (done) => {
      // arrange
      const expected = {
        nameId: "",
        area: "",
        store: "",
      };
      component["tempFilter"] = expected;
      // assert
      component.filtered.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onApply();
    });
  });

  describe("On change value filters", () => {
    it("should call onChangedInput", () => {
      component.onChangedInput("abc");
      expect(component["tempFilter"].name).toEqual("abc");
    });
    it("should call onAreaSelected", () => {
      component.onAreaSelected("abc");
      expect(component["tempFilter"].area).toEqual("abc");
    });
    it("should call onStoreSelected", () => {
      component.onStoreSelected("abc");
      expect(component["tempFilter"].store).toEqual("abc");
    });
    it("should call onClear", () => {
      component["tempFilterDefault"] = {
        name: "",
        area: "",
        store: "",
      };
      component.onClickClear();
      expect(component["tempFilter"]).toEqual(component["tempFilterDefault"]);
    });
  });
});
