import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";

import { SelectComponent } from "./select.component";
import { SelectModule } from "./select.module";

describe("SelectComponent", () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;
  let debugElement: DebugElement;

  const items = [
    { value: "once", label: "once" },
    { value: "daily", label: "daily" },
    { value: "weekly", label: "weekly" },
    { value: "monthly", label: "monthly" },
    { value: "yearly", label: "yearly" },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not show lable on select value", () => {
    // arrange
    component.selectedItem = "TEST";
    // act
    fixture.detectChanges();
    const labelElement = debugElement.queryAll(By.css("[data-test=show-placeholder]"));

    // assert
    expect(labelElement.length).toEqual(0);
  });
  it("should show lable on select value", () => {
    // arrange
    component.selectedItem = "";
    // act
    fixture.detectChanges();
    const labelElement = debugElement.queryAll(By.css("[data-test=show-placeholder]"));

    // assert
    expect(labelElement.length).toEqual(1);
  });

  it("should validate the drop down option with Input items", () => {
    // arrange
    component.items = items;
    component.placeholder = "placeholder";

    // act
    fixture.detectChanges();
    const matSelectTrigger = debugElement.query(By.css(".mat-select-trigger")).nativeElement;
    matSelectTrigger.click();
    fixture.detectChanges();

    const selectPanel = debugElement.query(By.css(".mat-select-panel"));
    const optionElement = debugElement.queryAll(By.css(".mat-option-text"));

    // assert
    expect(selectPanel).toBeTruthy();
    expect(optionElement[1].nativeElement.innerHTML).toContain("once");
    expect(optionElement[2].nativeElement.innerHTML).toContain("daily");
    expect(optionElement[3].nativeElement.innerHTML).toContain("weekly");
    expect(optionElement[4].nativeElement.innerHTML).toContain("monthly");
    expect(optionElement[5].nativeElement.innerHTML).toContain("yearly");
  });

  it("should validate the default selected value", () => {
    // arrange
    component.items = items;
    component.selectedItem = "daily";

    const expected = "daily";

    // act
    fixture.detectChanges();

    const selectTrigger = debugElement.query(By.css(".mat-select-trigger")).nativeElement;
    selectTrigger.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const defaultSelectedValue = debugElement.query(By.css(".mat-select-value .mat-select-value-text")).nativeElement;
      // assert
      expect(defaultSelectedValue.innerHTML).toContain(expected);
    });
  });

  describe("onSelectionChange()", () => {
    it("should emit selected item from the list", (done) => {
      // arrange
      component.items = items;
      fixture.detectChanges();

      const expected = "daily";

      // assert
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });

      // act
      component.onSelectionChange("daily");
    });
  });

  describe("getStyle", () => {
    it("should return on-disabled when disabled is true", () => {
      // arrange
      component.disabled = true;
      const expected = "on-disabled";
      // act
      const ret = component.getStyle();
      // assert
      expect(ret).toEqual(expected);
    });
    it("should return not-disabled when disabled is false", () => {
      // arrange
      component.disabled = false;

      const expected = "not-disabled";
      // act
      const ret = component.getStyle();
      // assert
      expect(ret).toEqual(expected);
    });
    it("should return not-disabled when disabled is undefined", () => {
      // arrange
      component.disabled = undefined;
      const expected = "not-disabled";
      // act
      const ret = component.getStyle();
      // assert
      expect(ret).toEqual(expected);
    });
  });
});
