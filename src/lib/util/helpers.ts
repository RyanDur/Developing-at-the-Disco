export const join = (...list: string[]) => list.filter(has).join(' ');

const emptyObject = (obj: Object) =>
  Object.getOwnPropertyNames(obj).length === 0;

const emptyArray = (arr: any[]) => arr.length === 0;

export const not = (val: any) => !val;

export const empty = (obj: any) =>
  not(obj) ||
  emptyObject(obj) ||
  emptyArray(obj);

export const has = (content: any) => not(empty(content));
export const notEmpty = has;

export const remove = (item: any, items: any[]): any[] => {
  const index: number = items.indexOf(item);
  return [...items.slice(0, index), ...items.slice(index + 1)];
};
