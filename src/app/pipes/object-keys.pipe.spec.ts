import { TestBed } from "@angular/core/testing";

import { ObjectKeysPipe } from "./object-keys.pipe";

describe(ObjectKeysPipe.name, () => {
  let target: ObjectKeysPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectKeysPipe],
    });
  });

  beforeEach(() => {
    target = TestBed.inject(ObjectKeysPipe);
  });

  describe(ObjectKeysPipe.prototype.transform.name, () => {
    it("should return array of keys", () => {
      // arrange
      const input = {
        one: 1,
        two: 2,
        three: 3,
      };
      const expected = ["one", "two", "three"];

      // act
      const actual = target.transform(input);

      // assert
      expect(actual).toEqual(expected);
    });
    it("should call send value null", () => {
      // arrange
      const input = null;
      const expected = undefined;

      // act
      const actual = target.transform(input);

      // assert
      expect(actual).toEqual(expected);
    });
  });
});
