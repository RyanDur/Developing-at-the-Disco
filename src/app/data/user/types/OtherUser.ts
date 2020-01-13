import * as t from 'io-ts';

export const OtherUserGuard = t.type({
  id: t.string,
  name: t.string
});
