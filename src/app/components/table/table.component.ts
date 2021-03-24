import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { IDisplayColumn, IPaginationOption, ISortType } from "./table.component.i";

@Component({
  selector: "cie-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent<T> {
  public displayedColumnsGrid: string[] = [];

  public displayedColumnsKeep: IDisplayColumn[];

  public dataSource: MatTableDataSource<T>;

  public dataSort: ISortType | ISortType[] | null;

  @Input()
  set displayedColumns(dataSend: IDisplayColumn[]) {
    this.displayedColumnsKeep = dataSend;
    dataSend.forEach((column) => {
      this.displayedColumnsGrid.push(column.key);
    });
  }

  @Input()
  set data(dataSend: T[]) {
    this.dataSource = new MatTableDataSource<T>(dataSend);
  }

  @Input() haveSort = false;

  @Input() haveSortMulti = false;

  @Input() havePagination = false;

  @Input() paginationOptions: IPaginationOption = {
    pageSizeOptions: [5, 10, 15],
    showFirstLastButtons: true,
  };

  @Output() sorting = new EventEmitter<ISortType | ISortType[]>();

  @Output() pagination = new EventEmitter<T>();

  @Output() rowDoubleClick = new EventEmitter<T>();

  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() {}

  onSorting(column: string): void {
    let dataSort: ISortType | ISortType[];
    // if is true then return ISortType[]
    if (this.haveSortMulti) {
      dataSort = this.dataSort as ISortType[];
      const isExits = dataSort.find((item) => item.key === column);
      if (isExits) {
        dataSort =
          (isExits.order === "DESC" && dataSort.map((item) => ({ ...item, order: item.key === isExits.key && "ASC" }))) ||
          dataSort.filter((item) => item.key !== isExits.key);
      } else {
        dataSort.push({ key: column, order: "DESC" });
      }
    }
    // if is false then return ISortType
    else {
      dataSort = this.dataSort as ISortType;
      dataSort = (dataSort.key === column && dataSort.order === "DESC" && { ...dataSort, order: "ASC" }) ||
        null || { key: column, order: "DESC" };
    }
    this.sorting.emit(dataSort);
  }

  onPagination($event) {
    this.pagination.emit($event);
  }
  getMatPaginator() {
    return this.paginator;
  }
  onRowDoubleClick(item: T) {
    this.rowDoubleClick.emit(item);
  }
  onRowClick(item: T) {
    this.rowClick.emit(item);
  }
}
