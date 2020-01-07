import {Listener, Store} from '../redux/types';
import {has} from '../util/helpers';

export const clientStorage = (name = 'state') => {
  const state = window.localStorage.getItem(name);
  return ({
    state: has(state) ? JSON.parse(state) : undefined,
    storageListener: <S extends Store>(store: S): Listener => () =>
      void window.localStorage.setItem(name, JSON.stringify(store.getState()))
  });
};
