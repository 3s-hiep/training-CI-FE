import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";

import { SelectMultiComponent } from "./select-multi.component";
import { SelectMultiModule } from "./select-multi.module";

describe("SelectMultiComponent", () => {
  let component: SelectMultiComponent;
  let fixture: ComponentFixture<SelectMultiComponent>;
  let debugElement: DebugElement;

  const items = [
    { value: "CI100", label: "CI100" },
    { value: "CI200", label: "CI200" },
    { value: "CI50", label: "CI50" },
  ];
  const values = ["CI100", "CI200", "CI50"];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectMultiModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMultiComponent);
    component = fixture.componentInstance;
    component.items = items;
    component.tempSelected = component.items;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should validate the label value", () => {
    // arrange
    component.label = "repeat";
    const expected = "repeat";
    // act
    fixture.detectChanges();
    const labelElement = debugElement.query(By.css("mat-label")).nativeElement;

    // assert
    expect(labelElement.innerHTML).toContain(expected);
  });

  it("should validate the drop down option with Input items", () => {
    // arrange
    component.items = items;

    // act
    fixture.detectChanges();
    const matSelectTrigger = debugElement.query(By.css(".mat-select-trigger")).nativeElement;
    matSelectTrigger.click();
    fixture.detectChanges();

    const selectPanel = debugElement.query(By.css(".mat-select-panel"));
    const optionElement = debugElement.queryAll(By.css(".mat-option-text"));

    // assert
    expect(selectPanel).toBeTruthy();
    expect(optionElement[0].nativeElement.innerHTML).toContain("CI100");
    expect(optionElement[1].nativeElement.innerHTML).toContain("CI200");
    expect(optionElement[2].nativeElement.innerHTML).toContain("CI50");
  });

  it("should validate the drop down option select All", () => {
    // arrange
    component.items = items;
    component.all = true;
    component.allValue = "All";
    // act
    fixture.detectChanges();
    const matSelectTrigger = debugElement.query(By.css(".mat-select-trigger")).nativeElement;
    matSelectTrigger.click();
    fixture.detectChanges();
    const selectPanel = debugElement.query(By.css(".mat-select-panel"));
    const optionElement = debugElement.queryAll(By.css(".mat-option-text"));
    // assert
    expect(selectPanel).toBeTruthy();
    expect(optionElement[0].nativeElement.innerHTML).toContain("ALL");
    expect(optionElement[1].nativeElement.innerHTML).toContain("CI100");
    expect(optionElement[2].nativeElement.innerHTML).toContain("CI200");
    expect(optionElement[3].nativeElement.innerHTML).toContain("CI50");
  });

  it("should validate the default selected value", () => {
    // arrange
    component.items = items;
    component.selectedItem = ["CI100"];

    const expected = ["CI100"];

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

  it("should call onSelectionChange method on select", () => {
    // arrange
    component.items = items;
    // act
    fixture.detectChanges();
    const selectBox = debugElement.query(By.css(".mat-select"));
    const onSelectionChangeMock = spyOn(component, "onSelectionChange");
    selectBox.nativeElement.dispatchEvent(new Event("selectionChange"));
    fixture.detectChanges();
    // assert
    expect(onSelectionChangeMock).toHaveBeenCalled();
  });

  describe("onSelectionChange() all is false", () => {
    it("should call onSelectionChange then allValue is not emty", (done) => {
      // arrange
      component.items = items;
      component.all = false;
      component.allValue = "All";
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
    });
    it("should call onSelectionChange then allValue is emty", (done) => {
      // arrange
      component.items = items;
      component.all = false;
      component.allValue = "";
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
    });
  });
  describe("onSelectionChange() all is true", () => {
    it("should call onSelectionChange allValue emty", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allValue = "";
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
    });

    it("should call onSelectionChange click ALL when allSelected false", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = false;
      component.allValue = "All";
      component.oldSelected = [];
      component.tempSelected = [];
      const input = [component.allValue];
      const expectValue = [component.allValue, ...items.map((item) => item.value)];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click option when allSelected false return null", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = false;
      component.allValue = "All";
      component.oldSelected = ["CI200", "CI50"];
      component.tempSelected = ["CI200", "CI50"];
      const input = ["CI100", "CI200", "CI50"];
      const expectValue = ["All", "CI100", "CI200", "CI50"];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click option when allSelected true change to ALL", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = true;
      component.allValue = "All";
      component.oldSelected = ["All", "CI200", "CI50"];
      component.tempSelected = ["CI200", "CI50"];
      const input = ["CI100", "CI200", "CI50"];
      const expectValue = [];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click option when allSelected true change to UNALL", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = true;
      component.allValue = "All";
      component.oldSelected = ["All", "CI100", "CI200", "CI50"];
      component.tempSelected = ["All", "CI100", "CI200", "CI50"];
      const input = ["All", "CI100", "CI200"];
      const expectValue = ["CI100", "CI200"];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click ALL when allSelected true", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = true;
      component.allValue = "All";
      component.oldSelected = [];
      component.tempSelected = [];
      const input = [];
      const expectValue = [];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });

    it("should call onSelectionChange click ALL when allSelected false", (done) => {
      // arrange
      component.items = items;
      component.all = true;
      component.allSelected = false;
      component.allValue = "All";
      component.oldSelected = ["All", "CI100", "CI200", "CI50"];
      component.tempSelected = ["All", "CI100", "CI200", "CI50"];
      const input = [];
      const expectValue = [];
      component.selected.subscribe({
        next: (value) => {
          expect(value).toEqual(expectValue);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(input);
    });
  });
  describe("getSelectNotAll()", () => {
    it("should return selectedItem when isStoryBook is false", () => {
      // arrange
      component.isStoryBook = false;
      component.selectedItem = values;
      component.tempSelected = [];
      // assert
      expect(component.getSelectNotAll()).toEqual(values);
    });
    it("should return tempSelected when isStoryBook is true", () => {
      // arrange
      component.isStoryBook = true;
      component.selectedItem = [];
      component.tempSelected = values;
      // assert
      expect(component.getSelectNotAll()).toEqual(values);
    });
    it("should return false when no input", () => {
      // arrange
      component.isStoryBook = false;
      component.selectedItem = [];
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
    it("should return false when no input", () => {
      // arrange
      component.isStoryBook = true;
      component.tempSelected = [];
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
    it("should return selected items", () => {
      // arrange
      const input = ["all", "CI200", "CI50"];
      component.allValue = "all";
      component.all = true;
      component.selectedItem = input;
      const expected = ["CI200", "CI50"];
      // assert
      expect(component.getSelectNotAll()).toEqual(expected);
    });
    it("should call when param null items length == 0", () => {
      // arrange
      component.allValue = "all";
      component.all = true;
      component.selectedItem = [];
      component.items = [];
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
    it("should call when param selectedItem is undefined", () => {
      // arrange
      component.allValue = "all";
      component.all = true;
      component.selectedItem = undefined;
      component.isStoryBook = false;
      component.tempSelected = [];
      component.items = items;
      // assert
      expect(component.getSelectNotAll()).toEqual([]);
    });
  });

  describe("getSelect()", () => {
    it("should return selectedItem when isStoryBook is false", () => {
      // arrange
      component.isStoryBook = false;
      component.selectedItem = values;
      component.tempSelected = [];

      // assert
      expect(component.getSelect()).toEqual(values);
    });

    it("should return tempSelected when isStoryBook is true", () => {
      // arrange
      component.isStoryBook = true;
      component.selectedItem = [];
      component.tempSelected = values;

      // assert
      expect(component.getSelect()).toEqual(values);
    });

    it("should return false when no input", () => {
      // arrange
      component.isStoryBook = true;
      component.tempSelected = [];

      // assert
      expect(component.getSelect()).toEqual([]);
    });
  });
});
