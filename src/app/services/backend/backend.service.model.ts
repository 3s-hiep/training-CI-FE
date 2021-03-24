/**
 * This file describes interfaces of backend data and arguments parameter of a method.
 */

export interface Token {
  userId: string;

  email: string;
  displayName: string;
  firstLoginDate: any;
}

export interface UserInfo {
  userId: string;
  email: string;
  displayName: string;
  firstLoginDate: any;
}

export interface FirstLogin {
  applicationId: number;
  email: string;
  firstLoginDate: string;
}
export interface User {
  userId: string;
  userName: string;
  areas: ICommonName[];
  stores: ICommonName[];
  roles?: ICommonName[];
  status?: string;
  deleteFlag: boolean;
}

export interface IUser {
  userId?: string;
  userName: string;
  status: string;
  roles: ICommonName[];
  stores: ICommonName[];
  passwordChangeFlag: boolean;
  newUserId?: string;
}
export interface ICommonName {
  name: string;
}
export interface Store extends ICommonName {
  stores: ICommonName[];
}
export interface IFilterModel {
  text?: string;
  areaName?: string;
  storeName?: string;
}
