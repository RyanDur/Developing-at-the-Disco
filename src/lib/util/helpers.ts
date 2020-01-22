export const join = (...list: string[]) => list.filter(has).join(' ');

export const not = (val: any) => !val;
const emptyArray = (arr: any[]) => arr.length === 0;
const emptyObject = (obj: Object) => emptyArray(Object.keys(obj));

export const empty = (thing: any) => {
  if (Array.isArray(thing)) {
    return emptyArray(thing);
  } else if (not(isNaN(Number(thing))) || thing === undefined) {
    return not(thing);
  } else {
    return emptyObject(thing);
  }
};

export const has = (content: any) => not(empty(content));
export const notEmpty = has;

export const remove = (item: any, items: any[]): any[] => {
  const index: number = items.indexOf(item);
  return [...items.slice(0, index), ...items.slice(index + 1)];
};
