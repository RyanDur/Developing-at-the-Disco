export const not = (val: any): boolean => !val;
export const is = (val: any): boolean => !!val;

export const empty = (thing: any): boolean => {
  switch (typeOf(thing)) {
    case 'number':
      return false;
    case 'object':
      return emptyObject(thing);
    default:
      return not(thing);
  }
};

export const has = (content: any): boolean => not(empty(content));

export const classes = (...strings: string[]): string =>
  strings.filter(has).join(' ');

export const remove = <T = any>(item: T, items: T[]): T[] => {
  const index: number = items.indexOf(item);
  return [...items.slice(0, index), ...items.slice(index + 1)];
};

const typeOf = (thing: any): string => thing === null ? 'null' : typeof thing;
const emptyObject = (obj: object): boolean =>
  is((JSON.stringify(obj).match(/{}|\[]/) || []).length);
