import { getLastToken, getFriendlyClass, getCookie } from "./utils";

describe("Utilities for Store", () => {
  describe(getLastToken.name, () => {
    const testCase = [
      { title: "undefined", input: undefined, expected: "" },
      { title: "object", input: { name: "LastToken" }, expected: "" },
      { title: "array", input: ["LastToken"], expected: "" },
      { title: "empty", input: "", expected: "" },
      { title: "lastToken", input: "lastToken", expected: "lastToken" },
      { title: "token has period", input: "colName.tableName.lastToken", expected: "lastToken" },
    ];
    testCase.forEach((c) => {
      it(`should return ${c.expected} when ${c.title}`, () => {
        // act
        const actual = getLastToken(c.input);
        // assert
        expect(actual).toEqual(c.expected);
      });
    });
  });

  describe(getFriendlyClass.name, () => {
    const defaultName = "tableCell";
    const testCase = [
      { title: "should return defaultName", input: { col: undefined, preName: undefined }, expected: defaultName },
      { title: "should return defaultName", input: { col: {}, preName: undefined }, expected: defaultName },
      {
        title: "should return with preDefaultName",
        input: { col: "lastToken", preName: undefined },
        expected: `${defaultName}-lastToken`,
      },
      {
        title: "should return last token with with preDefaultName",
        input: { col: "colName.tableName.lastToken", preName: undefined },
        expected: `${defaultName}-lastToken`,
      },
      { title: "should return preName", input: { col: undefined, preName: "preName" }, expected: "preName" },
      { title: "should return preName", input: { col: {}, preName: "preName" }, expected: "preName" },
      {
        title: "should return with preName",
        input: { col: "lastToken", preName: "preName" },
        expected: "preName-lastToken",
      },
      {
        title: "should return last token with with preName",
        input: { col: "colName.tableName.lastToken", preName: "preName" },
        expected: "preName-lastToken",
      },
    ];
    testCase.forEach((c) => {
      it(`${c.title}`, () => {
        // act
        const actual = getFriendlyClass(c.input.col, c.input.preName);
        // assert
        expect(actual).toEqual(c.expected);
      });
    });
  });

  describe(getCookie.name, () => {
    it(`should return have been cookie by key`, () => {
      Object.defineProperty(window.document, "cookie", {
        get: () => "sessionId=sessionId;",
      });
      const actual = getCookie("sessionId");
      expect(actual).toBe("sessionId");
    });
    it(`should not return have cookie by key`, () => {
      Object.defineProperty(window.document, "cookie", {
        get: () => "",
      });
      const actual = getCookie("sessionId");
      expect(actual).toBe(null);
    });
  });
});
