import * as t from 'io-ts';

export const CurrentUserGuard = t.type({
  id: t.string,
  name: t.string
});
