import { Action } from "@ngrx/store";
import { SetLang, reducer, selectors } from "./settings";

export class DefaultLang implements Action {
  readonly type = "DefaultLang";
  constructor(public payload: string) {}
}
describe("Store for Settings", () => {
  describe(SetLang.name, () => {
    it("should set language", () => {
      // arrange
      const payload = "ja-jp";
      const action = new SetLang(payload);
      const state = undefined;
      const expected = payload;

      // act
      const actual = reducer(state, action);

      // assert
      expect(actual.lang).toBe(expected);
    });

    it("should change language", () => {
      // arrange
      const payload = "ja-jp";
      const action = new SetLang(payload);
      const state = { lang: "en-us" };
      const expected = payload;

      // act
      const actual = reducer(state, action);

      // assert
      expect(actual.lang).toBe(expected);
    });

    it("should return default state language", () => {
      // arrange
      const payload = "en-us";
      const action = new DefaultLang(payload);
      const state = { lang: "en-us" };
      const expected = payload;
      // act
      const actual = reducer(state, action);
      // assert
      expect(actual.lang).toBe(expected);
    });
  });

  describe("projectors", () => {
    it("should get language", () => {
      // arrange
      const state = { lang: "en-us" };
      const expected = "en-us";

      // act
      const actual = selectors.lang(state);

      // assert
      expect(actual).toBe(expected);
    });
  });
});
