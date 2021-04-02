import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as UsersStore from "./users";
import { UserModel } from "./users.model";
import { usersFeatureSelector as featureSelector, AppState } from "../index";


export const usersSelector = createSelector<AppState, UsersStore.State, UserModel[]>(
    featureSelector,
    UsersStore.projectors.users
    // (state: UsersStore.State) => state.users
  );
