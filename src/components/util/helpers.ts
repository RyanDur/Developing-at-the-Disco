export const classes = (...classList: string[]) =>
  classList.filter(className => !!className).join(' ');

const emptyObject = (obj: Object) =>
  Object.getOwnPropertyNames(obj).length === 0;

const emptyArray = (arr: any[]) => arr.length === 0;

const not = (val: boolean) => !val;

export const empty = (obj: any) =>
  not(obj) ||
  emptyObject(obj) ||
  emptyArray(obj);

export const has = (obj: Object) => not(empty(obj));
