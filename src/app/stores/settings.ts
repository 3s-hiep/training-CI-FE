import { Action, ActionReducer, combineReducers } from "@ngrx/store";

export enum ActionTypes {
  SetLang = "[UserAction] Set language",
}

// Actions

export class SetLang implements Action {
  readonly type = ActionTypes.SetLang;
  constructor(public payload: string) {}
}

export type ActionsUnion = SetLang;

// States

export interface State {
  lang: string;
}

export const initialState: State = {
  lang: "en",
};

// Reducers

export const reducer: ActionReducer<State, Action> = combineReducers({
  lang: langReducer,
});

/**
 * @internal export for testing purpose
 */
export function langReducer(state: string = initialState.lang, action: ActionsUnion): string {
  switch (action.type) {
    case ActionTypes.SetLang: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}

// Selectors

export const selectors = {
  lang: (state: State) => state.lang,
};
