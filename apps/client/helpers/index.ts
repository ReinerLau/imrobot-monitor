export const replaceAll = (str: string) => {
  // if (str.includes("v-") || str.includes("{{") || str.includes("=>")) {
  return str
    .replaceAll(" ", "&nbsp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
  // } else {
  // return str.replace();
  // }
};
