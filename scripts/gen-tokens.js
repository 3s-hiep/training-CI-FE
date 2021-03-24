const fs = require("fs");
const path = require("path");

const tokens = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../src/assets/i18n/tokens.json")));

function resolvePath(path, tokens) {
  return Object.keys(tokens).reduce((prev, key) => {
    if (typeof tokens[key] === "string") {
      return { ...prev, [key]: `${path ? path + "." : ""}${key}` };
    } else {
      return { ...prev, [key]: resolvePath(`${path ? path + "." : ""}${key}`, tokens[key]) };
    }
  }, {});
}

fs.writeFileSync(path.resolve(__dirname, "../src/assets/i18n/tokens.json"), JSON.stringify(resolvePath("", tokens), null, 2) + "\n");
