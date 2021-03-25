import { InjectionToken } from "@angular/core";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import * as SettingsStore from "./settings";
import * as UsersStore from "./users/users";

// States
export interface AppState {
  settings: SettingsStore.State;
  router: RouterReducerState;
  users: UsersStore.State;
}

export const initialState: AppState = {
  settings: SettingsStore.initialState,
  router: null,
  users: UsersStore.initialState,
};

// Reducers

// MUST be a function because pass the static analysis in AoT build
export function getReducers(): ActionReducerMap<AppState> {
  return {
    settings: SettingsStore.reducer,
    router: routerReducer,
    users: UsersStore.reducer,
  };
}

export const metaReducers: MetaReducer<AppState>[] = [];

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
  "reducers"
);

// Selectors

export const settingsFeatureSelector = createFeatureSelector<
  AppState,
  SettingsStore.State
>("settings");

export const langSelector = createSelector<
  AppState,
  SettingsStore.State,
  string
>(settingsFeatureSelector, SettingsStore.selectors.lang);

export const usersFeatureSelector = createFeatureSelector<AppState, UsersStore.State>("users");
