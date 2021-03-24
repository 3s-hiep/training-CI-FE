import { InjectionToken } from "@angular/core";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";

import * as SettingsStore from "./settings";

// States
export interface AppState {
  settings: SettingsStore.State;
  router: RouterReducerState;
}

export const initialState: AppState = {
  settings: SettingsStore.initialState,
  router: null,
};

// Reducers

// MUST be a function because pass the static analysis in AoT build
export function getReducers(): ActionReducerMap<AppState> {
  return {
    settings: SettingsStore.reducer,
    router: routerReducer,
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
