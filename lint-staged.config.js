module.exports = {
  "{src,test}/**/*.ts": (filenames) => {
    const targets = filenames.join(" ");

    const format = "pretty-quick --staged";
    const lint = `eslint --max-warnings 0 --fix ${targets}`;
    const gitAdd = `git add ${targets}`;

    return [format, lint, gitAdd];
  },
};
