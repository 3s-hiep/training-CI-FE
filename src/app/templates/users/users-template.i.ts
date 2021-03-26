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
  id: any;
  name?: string;
  area?: string;
  store?: string;
  action?: any;
}
