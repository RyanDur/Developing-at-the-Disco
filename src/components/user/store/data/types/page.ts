import * as t from 'io-ts';
import {Type} from 'io-ts';

const Sort = t.partial({
  sorted: t.boolean,
  unsorted: t.boolean,
  empty: t.boolean
});

const Pageable = t.partial({
  sort: Sort,
  offset: t.number,
  pageSize: t.number,
  pageNumber: t.number,
  paged: t.boolean,
  unpaged: t.boolean
});

export const Page = <T>(guard: Type<T>) => t.type({
  content: guard,
  pageable: Pageable,
  last: t.boolean,
  totalPages: t.number,
  totalElements: t.number,
  size: t.number,
  number: t.number,
  sort: Sort,
  numberOfElements: t.number,
  first: t.boolean,
  empty: t.boolean
});
