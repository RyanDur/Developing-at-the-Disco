import {default as React} from 'react';
import {render, TestRender} from '../../../__tests__/support/testApi';
import {
  anotherTestReducer,
  middlewareAction,
  otherMiddlewareAction,
  someAction,
  testMiddleware,
  testReducer
} from '../../__tests__/support';
import {createProvider} from '../store';
import {createStore} from '../../redux';
import {TestElement} from '../../__tests__/support/TestElement';
import {otherTestMiddleware} from '../../__tests__/support/testMiddlewares';
import {someInitialState} from '../../__tests__/support/TestReducers';

describe('Connecting components to the state.', () => {
  let subject: TestRender, getBy: TestRender['getBy'], click: TestRender['click'];

  describe('without middleware', () => {
    beforeEach(() => {
      const Provider = createProvider(createStore(testReducer));
      subject = render(<Provider><TestElement testActions={[someAction]}/></Provider>);
      getBy = subject.getBy;
    });

    it('should create the initial state', () =>
      expect(getBy('#value').innerHTML).toEqual(someInitialState.value));

    it('should update the state when dispatching an action', () => {
      subject.click(getBy('button'));
      return expect(getBy('#value').innerHTML).toEqual(someAction.value);
    });
  });

  describe('with middleware', () => {
    beforeEach(() => {
      const Provider = createProvider(createStore(anotherTestReducer, [testMiddleware, otherTestMiddleware]));
      subject = render(<Provider><TestElement testActions={[middlewareAction, otherMiddlewareAction]}/></Provider>);
      click = subject.click;
      subject.click(getBy('button'));
    });

    it('should dispatch to the reducers', () =>
      expect(getBy('#value').innerHTML).toEqual(middlewareAction.value));

    it('should have access to the current state', () =>
      expect(getBy('#other').innerHTML)
        .toEqual('new value: other middleware updated value, current value: other initial'));
  });
});
