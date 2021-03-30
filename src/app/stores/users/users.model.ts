// import { User } from "../../services/backend/backend.service.model";

export interface User {
  userId: string;
  userName: string;
  areas: ICommonName[];
  stores: ICommonName[];
  deleteFlag: boolean;
}

export interface ICommonName {
  name: string;
}

export type UserModel = User;
export interface DataListModel {
  items: User[];
}
