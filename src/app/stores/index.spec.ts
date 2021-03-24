import * as store from ".";
import * as SettingsStore from "./settings";
import { routerReducer } from "@ngrx/router-store";
describe("store index", () => {
  describe(store.getReducers.name, () => {
    test("users", () => {
      // arrange

      const expected = {
        settings: SettingsStore.reducer,
        router: routerReducer,
      };
      // act
      const actual = store.getReducers();
      // assert
      expect(actual).toEqual(expected);
    });
  });
});
