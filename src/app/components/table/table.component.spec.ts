import { TestBed, ComponentFixture } from "@angular/core/testing";
import { TranslateModule } from "@ngx-translate/core";
import { TableComponent } from "./table.component";
import { IDisplayColumn } from "./table.component.i";
import { TableModule } from "./table.module";

describe(TableComponent.name, () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TableModule, TranslateModule.forRoot()],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should call onPagination and emit the action", (done) => {
    const event: any = {
      value: "ok",
    };
    component.pagination.subscribe({
      next: (actual) => {
        expect(actual).toEqual(event);
        done();
      },
      error: (error) => fail(error),
      complete: () => fail("should not complete"),
    });
    component.onPagination(event);
  });

  it("should be call getMatPaginator", () => {
    const output = component.getMatPaginator();
    expect(output).toEqual(component.paginator);
  });

  it("should display dataSend displayedColumns", () => {
    // arrange
    const dataSend: IDisplayColumn[] = [{ key: "name", label: "name", haveSort: false }];

    // act
    component.displayedColumns = dataSend;
    const expected = ["name"];

    // assert
    expect(component["displayedColumnsGrid"]).toEqual(expected);
  });

  it("should display dataSend", () => {
    // arrange
    const dataSend = [];
    component.data = dataSend;
    // act
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelectorAll("tr");
    // assert
    expect(element[1]).toBeUndefined();
  });

  describe("onSorting", () => {
    it("should emit sorting ASC with haveSortMulti is false", (done) => {
      // arrange
      const column = "name";
      component.haveSortMulti = false;
      component["dataSort"] = {
        key: "name",
        order: "DESC",
      };

      // act
      const expected = {
        key: "name",
        order: "ASC",
      };

      // assert
      component.sorting.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSorting(column);
    });

    it("should emit sorting DESC with haveSortMulti is false", (done) => {
      // arrange
      const column = "name";
      component.haveSortMulti = false;
      component["dataSort"] = {
        key: "actions",
        order: "DESC",
      };

      // act
      const expected = {
        key: "name",
        order: "DESC",
      };

      // assert
      component.sorting.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSorting(column);
    });

    it("should emit sorting ASC with haveSortMulti is true", (done) => {
      // arrange
      const column = "name";
      component.haveSortMulti = true;

      component["dataSort"] = [
        {
          key: "name",
          order: "DESC",
        },
        {
          key: "actions",
          order: null,
        },
      ];

      // act
      const expected = [
        {
          key: "name",
          order: "ASC",
        },
        {
          key: "actions",
          order: false,
        },
      ];

      // assert
      component.sorting.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSorting(column);
    });

    it("should emit sorting DESC with haveSortMulti is true", (done) => {
      // arrange
      const column = "name";
      component.haveSortMulti = true;

      component["dataSort"] = [
        {
          key: "date",
          order: "DESC",
        },
      ];

      // act
      const expected = [
        {
          key: "date",
          order: "DESC",
        },
        {
          key: "name",
          order: "DESC",
        },
      ];

      // assert
      component.sorting.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSorting(column);
    });

    it("should emit sorting key with haveSortMulti is true", (done) => {
      // arrange
      const column = "name";
      component.haveSortMulti = true;

      component["dataSort"] = [
        {
          key: "area",
          order: "ASC",
        },
      ];

      // act
      const expected = [
        {
          key: "area",
          order: "ASC",
        },
        {
          key: "name",
          order: "DESC",
        },
      ];

      // assert
      component.sorting.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSorting(column);
    });

    it("should emit sorting key with haveSortMulti is true", (done) => {
      // arrange
      const column = "name";
      component.haveSortMulti = true;

      component["dataSort"] = [
        {
          key: "name",
          order: "ASC",
        },
      ];

      // act
      const expected = [];

      // assert
      component.sorting.subscribe({
        next: (actual) => {
          expect(actual).toEqual(expected);
          done();
        },
        error: (error) => fail(error),
        complete: () => fail("should not complete"),
      });
      component.onSorting(column);
    });
  });

  it("should call onRowDoubleClick and emit the action", (done) => {
    const event: any = {
      value: "ok",
    };
    component.rowDoubleClick.subscribe({
      next: (actual) => {
        expect(actual).toEqual(event);
        done();
      },
      error: (error) => fail(error),
      complete: () => fail("should not complete"),
    });
    component.onRowDoubleClick(event);
  });

  it("should call onRowClick and emit the action", (done) => {
    const event: any = {
      value: "ok",
    };
    component.rowClick.subscribe({
      next: (actual) => {
        expect(actual).toEqual(event);
        done();
      },
      error: (error) => fail(error),
      complete: () => fail("should not complete"),
    });
    component.onRowClick(event);
  });
});
