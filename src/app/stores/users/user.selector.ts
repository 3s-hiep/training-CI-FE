import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as UsersStore from "./users";
import { UserModel } from "./users.model";
import { usersFeatureSelector as featureSelector, AppState } from "../index";

// const getListUsersState = createFeatureSelector < UsersStore.State >
// export const usersSelector = createSelector(
//   getListUsersState,
//   state => state.users;
// )
// export const usersFeatureSelector = createFeatureSelector<{}, UsersStore.State>("users");

export const usersSelector = createSelector<AppState, UsersStore.State, UserModel[]>(
    featureSelector,
    UsersStore.projectors.users
    // (state: UsersStore.State) => state.users
  );
