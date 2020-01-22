import {default as React} from 'react';
import {
  anotherTestReducer,
  middlewareAction,
  otherMiddlewareAction,
  someAction,
  testMiddleware,
  testReducer
} from '../../__tests__/support';
import {createStore} from '../../redux';
import {TestElement} from '../../__tests__/support/TestElement';
import {otherTestMiddleware} from '../../__tests__/support/testMiddlewares';
import {someInitialState} from '../../__tests__/support/TestReducers';
import {Provider} from '../Provider';
import {mount, ReactWrapper} from 'enzyme';

describe('Connecting components to the state.', () => {
  let subject: ReactWrapper;

  describe('without middleware', () => {
    beforeEach(() => {
      const store = createStore(testReducer);
      subject = mount(<Provider store={store}><TestElement testActions={[someAction]}/></Provider>);
    });

    it('should create the initial state', () =>
      expect(subject.find('#value').text()).toEqual(someInitialState.value));

    it('should update the state when dispatching an action', () => {
      subject.find('button').simulate('click');
      expect(subject.find('#value').text()).toEqual(someAction.value);
    });
  });

  describe('with middleware', () => {
    beforeEach(() => {
      const store = createStore(anotherTestReducer, [testMiddleware, otherTestMiddleware]);
      subject = mount(
        <Provider store={store}>
          <TestElement testActions={[middlewareAction, otherMiddlewareAction]}/>
        </Provider>
      );
      subject.find('button').simulate('click');
    });

    it('should dispatch to the reducers', () =>
      expect(subject.find('#value').text()).toEqual(middlewareAction.value));

    it('should have access to the current state', () =>
      expect(subject.find('#other').text())
        .toEqual('new value: other middleware updated value, current value: other initial'));
  });
});
