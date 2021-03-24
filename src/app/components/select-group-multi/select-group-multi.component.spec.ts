import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { SelectGroupMultiComponent } from "./select-group-multi.component";
import { SelectGroupMultiModule } from "./select-group-multi.module";

describe("SelectGroupMultiComponent", () => {
  let component: SelectGroupMultiComponent;
  let fixture: ComponentFixture<SelectGroupMultiComponent>;
  let debugElement: DebugElement;

  const groups = [
    {
      name: "name",
      items: [
        { value: "CI100", label: "CI100" },
        { value: "CI200", label: "CI200" },
        { value: "CI50", label: "CI50" },
      ],
    },
  ];
  const values = ["CI100", "CI200", "CI50"];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectGroupMultiModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGroupMultiComponent);
    component = fixture.componentInstance;
    component.groups = groups;
    component.tempSelected = component.groups;
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

  it("should validate the drop down option with Input groups", () => {
    // arrange
    component.groups = groups;

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

  it("should validate the default selected value", () => {
    // arrange
    component.groups = groups;
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
    component.groups = groups;

    // act
    fixture.detectChanges();
    const selectBox = debugElement.query(By.css(".mat-select"));
    const onSelectionChangeMock = spyOn(component, "onSelectionChange");
    selectBox.nativeElement.dispatchEvent(new Event("selectionChange"));
    fixture.detectChanges();

    // assert
    expect(onSelectionChangeMock).toHaveBeenCalled();
  });

  describe("ngOnChanges()", () => {
    it("should call ngOnChanges then change tempSelected with selectedItem in changes", () => {
      // arrange
      component.tempSelected = [];
      component.selectedItem = ["1", "2"];

      //act
      const expected = ["1", "2"];
      component.ngOnChanges();

      // assert
      expect(component.tempSelected).toEqual(expected);
    });
  });

  describe("onSelectionChange() all is false", () => {
    it("should emit selected value", (done) => {
      // arrange
      component.groups = groups;
      component.selected.subscribe({
        next: (value) => {
          // assert
          expect(value).toEqual(values);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      component.onSelectionChange(values);
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

  describe("getDisplaySelectItem()", () => {
    it("should return itemsDisplay with number of items not exceeding maxItemsDisplay", () => {
      // arrange
      component.isStoryBook = false;
      component.maxItemsDisplay = 1;
      component.selectedItem = ["CI100", "CI200"];
      component.tempSelected = [];

      const expected = "CI100 (+1 other)";

      // act
      const act = component.getDisplaySelectItem();

      // assert
      expect(act).toEqual(expected);
    });

    it("should return itemsDisplay with number of items not exceeding maxItemsDisplay", () => {
      // arrange
      component.isStoryBook = false;
      component.maxItemsDisplay = 1;
      component.selectedItem = values;
      component.tempSelected = [];

      const expected = "CI100 (+2 others)";

      // act
      const act = component.getDisplaySelectItem();

      // assert
      expect(act).toEqual(expected);
    });
  });
});
