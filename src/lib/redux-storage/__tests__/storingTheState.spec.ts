import {SomeState} from '../../__tests__/support/types';
import {mockWindowProperty} from '../../__tests__/support';
import {clientStorage} from '../ClientStorage';
import {createStore} from '../../redux';

describe('storing the state in the client', () => {
  describe('when there is state', () => {
    const someState: SomeState = {value: 'look at my state'};
    const behaviors = {
      setItem: jest.fn(),
      getItem: jest.fn(() => JSON.stringify(someState)),
      removeItem: jest.fn()
    };
    mockWindowProperty('localStorage', behaviors);

    it('should put it in the local storage', () => {
      const {storageListener} = clientStorage();
      const store = createStore((state: SomeState) => {
        return state;
      }, undefined, someState);

      storageListener(store)();

      expect(behaviors.setItem).toBeCalledWith('state', JSON.stringify(someState));
    });

    it('should return the state', () => {
      const {state} = clientStorage();

      expect(state).toEqual(someState);
    });
  });

  describe('when there is not state', () => {
    const behaviors = {
      setItem: jest.fn(),
      getItem: jest.fn(() => undefined),
      removeItem: jest.fn()
    };
    mockWindowProperty('localStorage', behaviors);

    it('should return undefined', () => {
      const {state} = clientStorage();

      expect(state).toBeUndefined();
    });
  });
});
