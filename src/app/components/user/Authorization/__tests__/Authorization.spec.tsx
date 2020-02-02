import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {Authorization} from '../Authorization';
import {useDispatchSpy, useSelectorSpy} from '../../../../../__tests__/support/testApi';
import {Redirect, Router} from 'react-router-dom';
import {Path} from '../../../index';
import {createNewUser} from '../../../../store/user/action';
import {createMemoryHistory} from 'history';
import {when} from 'jest-when';
import {usernameErrors} from '../../../../store/user/selector';

describe('authorization', () => {
  const name = 'YaY';
  const password = 'WooHoo';
  const mockSelector = jest.fn();
  const mockDispatch = jest.fn();
  const mockPreventDefault = jest.fn();
  useDispatchSpy(mockDispatch);
  useSelectorSpy(mockSelector);
  let auth: ReactWrapper;

  describe('on user creation success', () => {
    beforeEach(async () => {
      mockSelector.mockReturnValue(undefined);
      auth = authorization();
    });

    describe('on init', () => {
      describe('when name is empty', () => {
        it('should not be able to submit the candidate', () => {
          typeAndMove('#password', 'some password');
          auth.find('form').simulate('submit');

          expect(mockDispatch).not.toHaveBeenCalled();
        });
      });

      describe('when password is empty', () => {
        it('should not be able to submit the candidate', () => {
          typeAndMove('#username', 'some name');
          auth.find('form').simulate('submit');

          expect(mockDispatch).not.toHaveBeenCalled();
        });
      });

      describe('when username and password are given', () => {
        beforeEach(() => signIn(name, password));

        it('should be able to submit the candidate', () => {
          expect(auth.find('button').prop('disabled'))
            .toBe(false);
        });

        describe('on submit', () => {
          beforeEach(async () => {
            auth.find('form').simulate('submit',
              {preventDefault: mockPreventDefault});
          });

          it('should prevent the default behavior when submitting a form', () =>
            expect(mockPreventDefault).toHaveBeenCalled());

          it('should create the user', () => {
            expect(mockDispatch).toHaveBeenCalledWith(createNewUser(name, password));
          });

          it('should not be able to submit again', () =>
            expect(auth.find('button').prop('disabled'))
              .toBe(true));
        });
      });
    });
  });

  describe('when name already exists', () => {
    const message = 'Username already exists.';
    const errors = {value: name, validations: ['USERNAME_EXISTS']};

    beforeEach(() => {
      mockDispatch.mockReset();
      when(mockSelector)
        .calledWith(usernameErrors)
        .mockReturnValue(errors);
      auth = authorization();
      signIn(name, password);
    });

    it('should not be able to submit', () =>
      expect(auth.find('button').prop('disabled'))
        .toBe(true));

    it('should not create the user', () =>
      expect(mockDispatch).not.toHaveBeenCalled());

    it('should display the errors', () =>
      expect(auth.find('#username').first().text())
        .toContain(message));

    describe('changing the name', () => {
      beforeEach(() => typeAndMove('#username', 'some name'));

      it('should be able to submit', () =>
        expect(auth.find('button').prop('disabled'))
          .toBe(false));

      describe('on submit', () => {
        beforeEach(() => auth.find('form')
          .simulate('submit'));

        it('should not be able to submit', () =>
          expect(auth.find('button').prop('disabled'))
            .toBe(true));

        it('should create the user', () =>
          expect(mockDispatch).toHaveBeenCalled());
      });
    });
  });

  describe('redirection', () => {
    it('should not happen when not authorized', () => {
      auth = authorization();
      expect(auth.find('#create-user').exists())
        .toBe(true);
    });

    it('should happen when authorized', () => {
      mockSelector.mockReturnValue({some: 'USER'});
      auth = authorization();
      expect(auth.find(Redirect).props().to).toBe(Path.HOME);
    });
  });

  const authorization = () => {
    const history = createMemoryHistory();
    return mount(<Router history={history}><Authorization/></Router>);
  };

  const typeAndMove = (selector: string, value: string = ''): void => {
    auth.find(`${selector} input`).simulate('change', {target: {value}});
    auth.find(`${selector} input`).simulate('focus');
    auth.find(`${selector} input`).simulate('blur');
  };

  const signIn = (username: string, pass: string = '') => {
    typeAndMove('#username', username);
    typeAndMove('#password', pass);
  };
});

jest.mock('../../../../../config', () => ({
  endpoint: {
    users: 'I am an endpoint'
  },
  maxUsernameLength: 30
}));
