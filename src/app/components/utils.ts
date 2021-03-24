export function getLastToken(token: any): string {
  return typeof token === "string" ? token.slice(token.lastIndexOf(".") + 1, token.length) : "";
}
export function getFriendlyClass(col: any, preName?: string): string {
  const preClass = preName ? preName : "tableCell";
  const last = getLastToken(col);
  if (last === "") {
    return preClass;
  }
  return preClass + "-" + last;
}

export function getCookie(name: string): string {
  const nameLenPlus = name.length + 1;
  return (
    document.cookie
      .split(";")
      .map((c) => c.trim())
      .filter((cookie) => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map((cookie) => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null
  );
}
