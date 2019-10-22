import * as t from 'io-ts';

export const OtherUserGuard = t.type({
  id: t.string,
  name: t.string
});

export type OtherUser = t.TypeOf<typeof OtherUserGuard>;
