import {default as React, Dispatch, Reducer} from 'react';
import {render, TestRender} from '../../__tests__/support/testApi';
import {TestElement} from './support/TestElement';
import {Action, Reducers, State} from '../types';
import {OtherAction, TestAction, TestState} from './types';
import {Middleware} from '../types';
import {connect, createProvider} from '../store';
import {SomeAction, TestActionType} from './types/TestAction';

describe('Connecting components to the state.', () => {
  let subject: TestRender, getBy: TestRender['getBy'], click: TestRender['click'];
  const mock = jest.fn();
  const initialState = {value: 'before'};
  const otherState = {other: 'other before'};
  const someAction: SomeAction = {type: TestAction.SOME_ACTION, value: 'after'};
  const someMiddlewareAction: SomeAction = {type: TestAction.SOME_ACTION, value: 'after middleware'};
  const otherAction: OtherAction = {type: TestAction.OTHER_ACTION, other: 'other after'};
  const otherMiddlewareAction: OtherAction = {type: TestAction.OTHER_ACTION, other: 'other middleware after'};

  const middleware: Middleware<TestState, TestActionType> =
    () => next => action => {
      if (TestAction.MIDDLEWARE_ACTION === action.type) {
        next(someAction);
      }
    };
  const testReducer: Reducer<TestState, TestActionType> =
    (state: TestState = initialState, action: TestActionType): TestState => {
      switch (action.type) {
      case TestAction.SOME_ACTION:
        return {...state, value: action.value};
      case TestAction.OTHER_ACTION:
        return {...state, other: action.other};
      default:
        return state;
      }
    };

  describe('with a single reducer', () => {
    const anotherMiddleware: Middleware<TestState, TestActionType> =
      api => next => action => {
        if (TestAction.OTHER_MIDDLEWARE_ACTION === action.type) {
          next(otherAction);
        }
        if (api.getState() === initialState) {
          mock(someMiddlewareAction);
        }
      };
    const mapStateToProps = (state: State) => state;
    const mapDispatchToProps = (dispatch: Dispatch<TestActionType>) => ({
      func: () => {
        dispatch(someAction);
        dispatch(otherAction);
      }
    });

    describe('without middleware', () => {
      beforeEach(() => {
        const Provider = createProvider(testReducer);
        const ConnectedTestElement = connect(mapStateToProps, mapDispatchToProps)(TestElement);
        subject = render(<Provider><ConnectedTestElement/></Provider>);
        getBy = subject.getBy;
        click = subject.click;
      });

      it('should create the initial state', () => {
        expect(getBy('#value').innerHTML).toEqual(initialState.value);
      });

      it('should update the state when dispatching an action', () => {
        click(getBy('button'));

        expect(getBy('#value').innerHTML).toEqual(someAction.value);
      });
    });

    describe('with middleware', () => {
      beforeEach(() => {
        const Provider = createProvider(testReducer, [middleware, anotherMiddleware]);
        const ConnectedTestElement = connect(mapStateToProps, mapDispatchToProps)(TestElement);
        subject = render(<Provider><ConnectedTestElement/></Provider>);
        getBy = subject.getBy;
        click = subject.click;
      });

      it('should dispatch to the reducers', () => {
        click(getBy('button'));

        expect(getBy('#value').innerHTML).toEqual(someAction.value);
        expect(getBy('#other').innerHTML).toEqual(otherAction.other);
      });

      it('should have access to the current state', () => {
        click(getBy('button'));

        expect(mock).toHaveBeenCalledWith(someMiddlewareAction);
      });
    });
  });

  describe('with multiple reducers', () => {
    const otherReducer: Reducer<TestState, OtherAction> = (state: TestState = otherState, action: OtherAction): TestState => {
      if (action.type === TestAction.OTHER_ACTION) {
        return {other: state.other + action.other};
      } else {
        return state;
      }
    };
    const mapStateToProps = ({red1, red2}: State) => ({...red1, ...red2});
    const mapDispatchToProps = (dispatch: Dispatch<TestActionType | OtherAction>) => ({
      func: () => {
        dispatch(someAction);
        dispatch(otherAction);
      }
    });
    const anotherMiddleware: Middleware<TestState, TestActionType> =
      api => next => action => {
        if (TestAction.OTHER_MIDDLEWARE_ACTION === action.type) {
          next(otherMiddlewareAction);
        }
        if (api.getState().red1 === initialState) {
          mock(someMiddlewareAction);
        }
      };
    const ConnectedTestElement = connect(mapStateToProps, mapDispatchToProps)(TestElement);
    const spreadElements: Reducers<State, Action<TestAction>> = {red1: testReducer, red2: otherReducer};
    const Provider = createProvider(spreadElements, [middleware, anotherMiddleware]);

    beforeEach(() => {
      subject = render(<Provider><ConnectedTestElement/></Provider>);
      getBy = subject.getBy;
      click = subject.click;
    });

    describe('on load', () => {
      it('should create the initial state', () => {
        expect(getBy('#value').innerHTML).toEqual(initialState.value);
        expect(getBy('#other').innerHTML).toEqual(otherState.other);
      });
    });

    it('should update the state when dispatching an action', () => {
      click(getBy('button'));

      expect(getBy('#value').innerHTML).toEqual(someAction.value);
      expect(getBy('#other').innerHTML).toEqual(otherState.other + otherAction.other);
    });

    describe('with middleware', () => {
      it('should dispatch to the reducers', () => {
        click(getBy('button'));

        expect(getBy('#value').innerHTML).toEqual(someAction.value);
        expect(getBy('#other').innerHTML).toEqual(otherState.other + otherAction.other);
      });

      it('should have access to the current state', () => {
        click(getBy('button'));

        expect(mock).toHaveBeenCalledWith(someMiddlewareAction);
      });
    });
  });
});
