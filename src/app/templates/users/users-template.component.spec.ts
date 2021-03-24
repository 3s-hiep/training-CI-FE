import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { IPaginationOption } from "../../components/table/table.component.i";
import { LabelledValue, Labels, UserFilter } from "../../components/user-filter/user-filter.i";
import { UsersTemplateComponent } from "./users-template.component";
import { UsersTemplateModule } from "./users-template.module";

describe("UsersTemplateComponent", () => {
  let component: UsersTemplateComponent;
  let fixture: ComponentFixture<UsersTemplateComponent>;
  const pageOption: IPaginationOption = {
    color: "primary",
    pageSizeOptions: [10, 20, 30],
    length: 1000,
    pageSize: 10,
    pageIndex: 3,
    disabled: false,
  };
  const pageTitle = "pageTitle";
  const ELEMENT_DATA: any[] = [
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
    {
      id: "00001",
      name: "Name 0001",
      area: "Area 0001",
      store: "store 0001",
      action: "action",
    },
  ];
  const filterAction = {
    userFilter: {
      name: "",
      area: "",
      store: "",
    } as UserFilter,
    userArea: [
      { value: "Area1", label: "Area1" },
      { value: "Area2", label: "Area2" },
      { value: "Area3", label: "Area3" },
      { value: "Area4", label: "Area4" },
      { value: "Area5", label: "Area5" },
    ] as LabelledValue<string>[],
    userStore: [
      { value: "Store1", label: "Store1" },
      { value: "Store2", label: "Store2" },
      { value: "Store3", label: "Store3" },
      { value: "Store4", label: "Store4" },
      { value: "Store5", label: "Store5" },
    ] as LabelledValue<string>[],
    labels: {
      name: {
        aria: "ID/Name",
        placeholder: " input",
      },
      area: {
        aria: "Area",
        placeholder: "All",
      },
      store: {
        aria: "Store",
        placeholder: "All",
      },
      buttonApply: "Apply",
      buttonClear: "Clear",
    } as Labels,
    filtered: () => jest.fn(),
  };
  const tableAction = {
    displayedColumns: [
      {
        key: "id",
        label: "ID",
      },
      {
        key: "name",
        label: "Name",
      },
      {
        key: "area",
        label: "Area",
      },
      {
        key: "store",
        label: "Store",
      },
      {
        key: "action",
        label: "Action",
      },
    ],
    data: ELEMENT_DATA,
    paginationOptions: pageOption,
    havePagination: true,
    pagination: () => jest.fn(),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersTemplateModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTemplateComponent);
    component = fixture.componentInstance;
    component.pageTitle = pageTitle;
    component.userFilter = filterAction.userFilter;
    component.userAreas = filterAction.userArea;
    component.userStores = filterAction.userStore;
    component.tableAction = tableAction;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  describe("should be send page title", () => {
    it("On send title is ABC", () => {
      // arrange
      // act
      fixture.detectChanges();
      const content = fixture.debugElement.query(By.css(`[data-test=header-page]`));
      // assert
      expect(content.nativeElement.textContent).toBe(pageTitle);
    });
  });

  describe("onFilters", () => {
    it("should call onFilters()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css("cie-user-filter"));
      const spy = jest.spyOn(component, "onFilters");
      filteredComponent.triggerEventHandler("filtered", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
    it("should emit filtered", (done) => {
      // arrange
      const expected = {
        name: "",
        area: "",
        store: "",
      };
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
      component.onFilters({
        name: "",
        area: "",
        store: "",
      });
    });
  });
  describe("onPagination", () => {
    it("should call onPagination()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css("cie-table"));
      const spy = jest.spyOn(component, "onPagination");
      filteredComponent.triggerEventHandler("pagination", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
    it("should emit pagination", (done) => {
      // arrange
      const expected = {
        limit: 10,
        offset: 1,
      };
      // assert
      component.pagination.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onPagination({
        limit: 10,
        offset: 1,
      });
    });
  });

  describe("onSelectArea", () => {
    it("should call onSelectArea()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css("cie-user-filter"));
      const spy = jest.spyOn(component, "onSelectArea");
      filteredComponent.triggerEventHandler("selectArea", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
    it("should emit onSelectArea", (done) => {
      // arrange
      const expected = "";
      // assert
      component.selectArea.subscribe({
        next: (value) => {
          expect(value).toEqual(expected);
          done();
        },
        error: (err) => fail(err),
        complete: () => fail("should not complete"),
      });
      // act
      component.onSelectArea("");
    });
  });

  describe("onClearFilter", () => {
    it("should call onClearFilter()", () => {
      // arrange
      // act
      fixture.detectChanges();
      const filteredComponent = fixture.debugElement.query(By.css("cie-user-filter"));
      const spy = jest.spyOn(component, "onClearFilter");
      filteredComponent.triggerEventHandler("clearFilter", {});
      fixture.detectChanges();
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });
  describe("onCreateButtonUsers", () => {
    it("should call onCreateButtonUsers and emit the event", () => {
      const spy = jest.spyOn(component.createButtonUsers, "emit").mockImplementation();
      component.onCreateButtonUsers();
      expect(spy).toHaveBeenCalled();
    });
  });
});
