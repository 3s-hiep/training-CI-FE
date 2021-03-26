import { IDisplayColumn } from "../../components/table/table.component.i";
import { usersPage } from "../../../assets/i18n/tokens.json";

export const displayColumns: IDisplayColumn[] = [
  {
    key: "userId",
    label: usersPage.table.displayColumns.id,
  },
  {
    key: "userName",
    label: usersPage.table.displayColumns.name,
  },
  {
    key: "areas",
    label: usersPage.table.displayColumns.area,
  },
  {
    key: "stores",
    label: usersPage.table.displayColumns.store,
  },
  {
    key: "action",
    label: usersPage.table.displayColumns.action,
  },
]

export const userTitle = usersPage.userTitle;
