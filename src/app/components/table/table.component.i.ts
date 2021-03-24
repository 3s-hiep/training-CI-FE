import { EventEmitter } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

import { Observable } from "rxjs";

export interface IDisplayColumn {
  key: string;
  label: string;
  haveSort?: boolean;
}

export interface IAddComponent<T> {
  data: T;
  emitTer: EventEmitter<any>;
}

export interface IPaginationOption {
  color?: ThemePalette;
  disabled?: boolean;
  hidePageSize?: boolean;
  length?: number;
  pageIndex?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  showFirstLastButtons?: boolean;
  initialized?: Observable<void>;
}

export interface ISortType {
  key: string;
  order: "DESC" | "ASC" | null | "";
}
