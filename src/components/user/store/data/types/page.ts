import * as t from 'io-ts';
import {Type} from 'io-ts';

const Sort = t.partial({
  sorted: t.boolean,
  unsorted: t.boolean,
  empty: t.boolean
});

const Pageable = t.type({
  sort: Sort,
  offset: t.number,
  pageSize: t.number,
  pageNumber: t.number,
  paged: t.boolean,
  unpaged: t.boolean
});

export const Page = <T>(guard: Type<T>) => t.type({
  content: guard,
  size: t.number,
  number: t.number,
  totalPages: t.number,
  totalElements: t.number,
  numberOfElements: t.number,
  last: t.boolean,
  first: t.boolean,
  empty: t.boolean,
  pageable: t.union([Pageable, t.undefined]),
  sort: t.union([Sort, t.undefined])
});
