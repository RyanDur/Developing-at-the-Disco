import {createStore} from '../createStore';
import {Listener, Store, Unsubscribe} from '../types';
import {
  MiddlewareAction,
  OtherMiddlewareAction,
  SomeAction,
  SomeActions,
  SomeState,
  SomeStates
} from '../../__tests__/support/types';
import {
  middlewareAction,
  otherAction,
  otherMiddlewareAction,
  otherTestMoreMiddleware,
  someAction,
  testMiddleware
} from '../../__tests__/support';
import {combineReducers} from '../combineReducers';
import {otherTestMiddleware} from '../../__tests__/support/testMiddlewares';
import {
  anotherInitialState,
  anotherTestReducer,
  otherTestReducer,
  someInitialState,
  testReducer
} from '../../__tests__/support/TestReducers';
import Mock = jest.Mock;

type CombinedActions = SomeActions | MiddlewareAction | OtherMiddlewareAction;
type CombinedStates = SomeState | SomeStates;

describe('creating the store', () => {
  describe('with a single reducer', () => {
    describe('without middleware', () => {
      const store: Store<SomeState, SomeAction> = createStore(testReducer);

      it('should have the initial state', () =>
        expect(store.getState()).toBe(someInitialState));

      it('should update the state when dispatching an action', () => {
        store.dispatch(someAction);
        expect(store.getState().value).toBe(someAction.value);
      });
    });

    describe('with middleware', () => {
      const store = createStore<CombinedStates, CombinedActions>(anotherTestReducer, [testMiddleware, otherTestMiddleware]);

      beforeEach(() => {
        store.dispatch(middlewareAction);
      });

      it('should dispatch to the reducers', () =>
        expect(store.getState().value).toBe(middlewareAction.value));

      it('should have access to the current state', () => {
        store.dispatch(otherMiddlewareAction);
        expect(store.getState().other).toBe(`new value: ${otherMiddlewareAction.value}, current value: ${anotherInitialState.other}`);
      });
    });
  });

  describe('with multiple reducers', () => {
    describe('without middleware', () => {
      const store: Store<SomeStates, SomeActions> = createStore(combineReducers({
        some: testReducer,
        other: otherTestReducer
      }));

      it('should have the initial state', () => {
        expect(store.getState().some).toBe(someInitialState);
        expect(store.getState().other).toBeUndefined();
      });

      describe('when updating the state', () => {
        beforeEach(() => store.dispatch(otherAction));

        it('should update only update for the specified action', () => {
          expect(store.getState().some).toBe(someInitialState);
          expect(store.getState().other.value).toBe(otherAction.value);
        });
      });
    });

    describe('with middleware', () => {
      const store = createStore<SomeStates, CombinedActions>(combineReducers({
        some: testReducer,
        other: otherTestReducer,
        another: anotherTestReducer
      }), [testMiddleware, otherTestMoreMiddleware]);

      beforeEach(() => [
        middlewareAction,
        otherMiddlewareAction
      ].map(store.dispatch));

      it('should dispatch to the reducers', () =>
        expect(store.getState().some.value).toBe(middlewareAction.value));

      it('should have access to the current state', () => {
        expect(store.getState().other.value).toBe(
          'new value: other middleware updated value, current value: new value: other middleware updated value, current value: other initial'
        );
      });
    });
  });

  describe('when subscribing to store updates', () => {
    const store: Store<SomeState, SomeAction> = createStore(anotherTestReducer);
    let listener: Mock<Listener>;
    let unsubscribe: Unsubscribe;

    beforeEach(() => {
      listener = jest.fn();

      unsubscribe = store.subscribe(listener);

      store.dispatch(someAction);
    });

    it('should fire off the listener', () =>
      expect(listener).toHaveBeenCalled());

    it('should be able to unsubscribe', () => {
      unsubscribe();
      store.dispatch(someAction);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
