import {Listener, Store} from '../redux/types';
import {has} from '../util/helpers';

export const clientStorage = () => {
  const state = window.localStorage.getItem('state');
  return ({
    state: has(state) ? JSON.parse(state) : undefined,
    storageListener: <S extends Store>(store: S): Listener => () =>
      void window.localStorage.setItem('state', JSON.stringify(store.getState()))
  });
};
