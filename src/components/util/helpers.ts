export const classes = (...classList: string[]) =>
  classList.filter(className => !!className).join(' ');

const emptyObject = (obj: Object) =>
  Object.getOwnPropertyNames(obj).length === 0;

const emptyArray = (arr: any[]) => arr.length === 0;

export const not = (val: any) => !val;

export const empty = (obj: any) =>
  not(obj) ||
  emptyObject(obj) ||
  emptyArray(obj);

export const has = (content: any) => not(empty(content));
