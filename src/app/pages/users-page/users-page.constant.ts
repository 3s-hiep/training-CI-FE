import { IDisplayColumn } from "../../components/table/table.component.i";
import { usersPage } from "../../../assets/i18n/tokens.json";
// import { CreateUserData } from "../../components/create-user/create-user-detail/create-user-detail.component.i";

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

// export const createDetailUser: CreateUserData = {
//   id: {
//     labels: { placeholder: usersPage.detail.userId.placeholder, aria: "" },
//     value: "",
//     notValid: false,
//     message: usersPage.detail.userId.message,
//   },
//   name: {
//     labels: { placeholder: usersPage.detail.userName.placeholder, aria: "" },
//     value: "",
//     notValid: false,
//     message: usersPage.detail.userName.message,
//   },
//   status: {
//     types: [
//       { label: usersPage.detail.status.active, value: "Active" },
//       { label: usersPage.detail.status.inactive, value: "Inactive" },
//     ],
//     value: "",
//   },
//   role: {
//     placeholder: usersPage.detail.role.placeholder,
//     types: [],
//     value: [],
//     notValid: false,
//     message: usersPage.detail.role.message,
//   },
//   store: {
//     placeholder: usersPage.detail.store.placeholder,
//     types: [],
//     value: [],
//     notValid: false,
//     message: usersPage.detail.store.message,
//   },
//   passwordConfirm: {
//     labels: { placeholder: "", aria: "password-confirm" },
//     value: false,
//   },
// };
