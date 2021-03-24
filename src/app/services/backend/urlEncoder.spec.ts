import moment from "moment";

import { URLEncoder } from "./urlEncoder";

describe("URLEncoder", () => {
  const uRLEncoder = new URLEncoder();
  describe("test function (", () => {
    it("should be call encodeKey", () => {
      const dateTest = moment(new Date()).toISOString();
      const enCodeDate = encodeURIComponent(dateTest);
      const input = `http://localhost/abc?id=12@date=${dateTest}`;
      expect(uRLEncoder.encodeKey(input)).toBe(`http%3A%2F%2Flocalhost%2Fabc%3Fid%3D12%40date%3D${enCodeDate}`);
    });

    it("should be call encodeValue", () => {
      const value = "3+2=1";
      const enCodeValue = encodeURIComponent(value);
      const input = `http://localhost/abc?id=12@date=${value}`;
      expect(uRLEncoder.encodeValue(input)).toBe(`http%3A%2F%2Flocalhost%2Fabc%3Fid%3D12%40date%3D${enCodeValue}`);
    });

    it("should be call decodeKey", () => {
      const dateTest = moment(new Date()).toISOString();
      const enCodeDate = encodeURIComponent(dateTest);
      const input = `http%3A%2F%2Flocalhost%2Fabc%3Fid%3D12%40date%3D${enCodeDate}`;
      expect(uRLEncoder.decodeKey(input)).toBe(`http://localhost/abc?id=12@date=${dateTest}`);
    });
    it("should be call decodeValue", () => {
      const value = "3+2=1";
      const enCodeValue = encodeURIComponent(value);
      const input = `http%3A%2F%2Flocalhost%2Fabc%3Fid%3D12%40date%3D${enCodeValue}`;
      expect(uRLEncoder.decodeValue(input)).toBe(`http://localhost/abc?id=12@date=${value}`);
    });
  });
});
