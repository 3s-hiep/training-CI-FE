import { IDisplayColumn, IPaginationOption } from "../../components/table/table.component.i";

export interface ITableAction {
  displayedColumns: IDisplayColumn[];
  paginationOptions: IPaginationOption;
  havePagination?: boolean;
}

export interface ITableUsersAcrion {
  displayColumns: IDisplayColumn[];
}

export interface IDataTable {
  userId: string;
  userName?: string;
  areas?: string;
  stores?: string;
  action?: any;
}
