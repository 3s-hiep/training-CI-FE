import { UserModel } from "./users.model";
import { Action, ActionReducer, combineReducers } from "@ngrx/store";
import { EntityState } from "@ngrx/entity";

export enum ActionTypes {
    // Get Users
    GetUsers = "[Users API] Get API Users",
    GetUsersSuccess = "[Users API] Get success",
    GetUsersFailure = "[Users API] Get failure",
}

export class GetList implements Action {
  readonly type = ActionTypes.GetUsers;
  constructor() {}
}
export class GetListSuccess implements Action {
  readonly type = ActionTypes.GetUsersFailure;
  constructor(public payload: UserModel[]) {}
}
export class GetListFailure implements Action {
  readonly type = ActionTypes.GetUsersSuccess;
  constructor(public payload: { reason?: string; code?: number }) {}
}

export type UserActions = GetList | GetListSuccess | GetListFailure;

export interface State {
  users: UserModel[];
  err: Error;
  // users1: EntityState<UserModel>;
}

export const initialState: State = {
    users: [],
    err: null,
}

export function userReducer(state = initialState.users, action: UserActions) {
  switch(action.type) {
    case ActionTypes.GetUsers:
      return { ...state };
    case ActionTypes.GetUsersSuccess:
      return { ...state, users: action.payload }
    case ActionTypes.GetUsersFailure:
      return { ...state, err: action.payload }
    default:
      return state;
  }
}
