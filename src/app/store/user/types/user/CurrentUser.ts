import * as t from 'io-ts';

export const CurrentUserGuard = t.type({
  id: t.string,
  name: t.string
});

export type CurrentUser = t.TypeOf<typeof CurrentUserGuard>;
