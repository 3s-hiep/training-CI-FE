import { getPage, checkedType, checkType, getPagingData, getTotalPageCount, getDiffBwtListData } from "./utils";
import { Pagination } from "./index.model";

/**
 * e.g.) limit = 3 -> [1, 2, 3]
 */
function createIndexArray(length: number): number[] {
  const array = [];
  for (let i = 0; i < length; ) {
    array[i] = ++i;
  }
  return array;
}

describe("Utilities for Store", () => {
  describe(checkedType.name, () => {
    [
      { title: "should return 'none' when 0 items are selected", input: { items: 10, selected: 0 }, expected: "none" },
      { title: "should return 'none' if both of items and selected are 0", input: { items: 0, selected: 0 }, expected: "none" },
      { title: "should return 'partial' if some items are selected", input: { items: 10, selected: 3 }, expected: "partial" },
      { title: "should return 'all' if items and selected are same", input: { items: 10, selected: 10 }, expected: "all" },
    ].forEach((spec) => {
      it(spec.title, () => {
        // act
        const actual = checkedType(spec.input.items, spec.input.selected);

        // assert
        expect(actual).toBe(spec.expected);
      });
    });
  });
  describe(checkType.name, () => {
    [
      { title: "should return 'none' when 0 items are selected", input: { items: [1, 2, 3], selected: [] }, expected: "none" },
      { title: "should return 'none' if both of items and selected are 0", input: { items: [], selected: [] }, expected: "none" },
      {
        title: "should return 'partial' if some items are selected",
        input: { items: [1, 2, 3, 4, 5], selected: [1, 2] },
        expected: "partial",
      },
      { title: "should return 'all' if items and selected are same", input: { items: [1, 2, 3], selected: [1, 2, 3] }, expected: "all" },
    ].forEach((spec) => {
      it(spec.title, () => {
        // act
        const actual = checkType(spec.input.items, spec.input.selected);

        // assert
        expect(actual).toBe(spec.expected);
      });
    });
  });

  describe(getPage.name, () => {
    it("should return default", () => {
      // arrange
      const data = null;
      const props = {};
      const expected = {
        current: 1,
        range: 1,
        limit: 1,
        size: 0,
        totalPages: 0,
        data: [],
      };
      // act
      const actual = getPage(data, props);
      // assert
      expect(actual).toEqual(expected);
    });

    it("should totalPages to 1 if size = 1 and limit = 10", () => {
      // arrange
      const data = createIndexArray(1);
      const props = { limit: 10 };
      const expected = 1;

      // act
      const actual = getPage(data, props);

      // assert
      expect(actual.totalPages).toBe(expected);
    });

    it("should totalPages to 1 if size = 10 and limit = 10", () => {
      // arrange
      const data = createIndexArray(10);
      const props = { limit: 10 };
      const expected = 1;

      // act
      const actual = getPage(data, props);

      // assert
      expect(actual.totalPages).toBe(expected);
    });

    it("should totalPages to 2 if size = 11 and limit = 10", () => {
      // arrange
      const data = createIndexArray(11);
      const props = { limit: 10 };
      const expected = 2;

      // act
      const actual = getPage(data, props);

      // assert
      expect(actual.totalPages).toBe(expected);
    });

    it("should return sliced data", () => {
      // arrange
      const data = createIndexArray(10);
      const props = { page: 2, limit: 3 };
      const expected = [4, 5, 6];

      // act
      const actual = getPage(data, props);

      // assert
      expect(actual.data).toEqual(expected);
    });

    it("should return sliced tail data", () => {
      // arrange
      const data = createIndexArray(10);
      const props = { page: 4, limit: 3 };
      const expected = [10];

      // act
      const actual = getPage(data, props);

      // assert
      expect(actual.data).toEqual(expected);
    });
  });

  describe(getPagingData.name, () => {
    it("should return empty array", () => {
      // arrange
      const data = null;
      const props: Pagination = { current: 0, limit: 0, size: 0, range: 0, totalPages: 0 };
      const expected = [];

      // act
      const actual = getPagingData(data, props);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should return entire array", () => {
      // arrange
      const data = createIndexArray(10);
      const props: Pagination = { current: 1, limit: 10, size: 10, range: 1, totalPages: 1 };
      const expected = data;

      // act
      const actual = getPagingData(data, props);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should return sliced array", () => {
      // arrange
      const data = createIndexArray(10);
      const props: Pagination = { current: 3, limit: 3, size: 10, range: 1, totalPages: 4 };
      const expected = [7, 8, 9];

      // act
      const actual = getPagingData(data, props);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should return sliced tail array", () => {
      // arrange
      const data = createIndexArray(10);
      const props: Pagination = { current: 4, limit: 3, size: 10, range: 1, totalPages: 4 };
      const expected = [10];

      // act
      const actual = getPagingData(data, props);

      // assert
      expect(actual).toEqual(expected);
    });

    it("should return empty array if current is out of data size", () => {
      // arrange
      const data = createIndexArray(10);
      const props: Pagination = { current: 10, limit: 3, size: 10, range: 1, totalPages: 4 };
      const expected = [];

      // act
      const actual = getPagingData(data, props);

      // assert
      expect(actual).toEqual(expected);
    });
  });

  describe(getTotalPageCount.name, () => {
    [
      { title: "should return 0 if size = 0", input: { size: 0, limit: 10 }, expected: 0 },
      { title: "should return size if limit = 1", input: { size: 8, limit: 1 }, expected: 8 },
      { title: "should return 4 if size = 10 and limit = 3", input: { size: 10, limit: 3 }, expected: 4 },
      { title: "should return 0 if size is negative", input: { size: -100, limit: 10 }, expected: 0 },
      { title: "should return size if limit is negative", input: { size: 10, limit: -10 }, expected: 10 },
      { title: "should return 4 if size = 10.5 and limit = 3.2", input: { size: 10.5, limit: 3.2 }, expected: 4 },
    ].forEach((spec) => {
      it(spec.title, () => {
        // act
        const actual = getTotalPageCount(spec.input.size, spec.input.limit);

        // assert
        expect(actual).toBe(spec.expected);
      });
    });
  });

  describe(getDiffBwtListData.name, () => {
    it("return array if there is a similarity between the two arrays when delete with ids is string", () => {
      // arrange
      const array$1 = [
        { id: "1", status: "good" },
        { id: "2", status: "missing" },
      ];
      const array$2 = [
        { id: "1", status: "good" },
        { id: "2", status: "missing" },
      ];

      // act
      const actual = getDiffBwtListData(array$1, array$2, "id", "status", "deleted");
      // assert
      expect(actual).toEqual(array$1);
    });
    it("return array if there is a similarity between the two arrays when delete with ids is array", () => {
      // arrange
      const array$1 = [
        { id: "1", id1: "a1", status: "good" },
        { id: "2", id1: "a2", status: "missing" },
      ];
      const array$2 = [
        { id: "1", id1: "a1", status: "good" },
        { id: "2", id1: "a2", status: "missing" },
      ];

      // act
      const actual = getDiffBwtListData(array$1, array$2, ["id", "id1"], "status", "deleted");
      // assert
      expect(actual).toEqual(array$1);
    });
    it("return the array if there is a difference between the two arrays when delete ids is string", () => {
      // arrange
      const array$1 = [
        { id: "1", status: "good" },
        { id: "2", status: "missing" },
        { id: "3", status: "good" },
      ];
      const array$2 = [
        { id: "1", status: "good" },
        { id: "2", status: "missing" },
      ];
      const expected = [
        { id: "1", status: "good" },
        { id: "2", status: "missing" },
        { id: "3", status: "deleted" },
      ];
      // act
      const actual = getDiffBwtListData(array$1, array$2, "id", "status", "deleted");
      // assert
      expect(actual).toEqual(expected);
    });
    it("return the array if there is a difference between the two arrays when delete ids is array", () => {
      // arrange
      const array$1 = [
        { id: "1", id1: "a1", status: "good" },
        { id: "2", id1: "a2", status: "missing" },
        { id: "3", id1: "a3", status: "good" },
        { id: "4", id1: "a4", status: "good" },
      ];
      const array$2 = [
        { id: "1", id1: "a1", status: "good" },
        { id: "2", id1: "a2", status: "missing" },
      ];
      const expected = [
        { id: "1", id1: "a1", status: "good" },
        { id: "2", id1: "a2", status: "missing" },
        { id: "3", id1: "a3", status: "deleted" },
        { id: "4", id1: "a4", status: "deleted" },
      ];
      // act
      const actual = getDiffBwtListData(array$1, array$2, ["id", "id1"], "status", "deleted");

      // assert
      expect(actual).toEqual(expected);
    });
  });
});
