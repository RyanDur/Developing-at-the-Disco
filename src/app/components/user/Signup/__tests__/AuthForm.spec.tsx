import * as React from 'react';
import {AuthForm} from '../AuthForm';
import {useDispatchSpy, useSelectorSpy} from '../../../../../__tests__/support/testApi';
import {mount, ReactWrapper} from 'enzyme';
import {createNewUser} from '../../../../store/user/action';

describe('Signing up', () => {
  const mockPreventDefault = jest.fn();
  const mockSelector = jest.fn();
  const mockDispatch = jest.fn();
  const name = 'YaY';
  const password = 'WooHoo';
  const props = {
    onSceneEnd: jest.fn(),
    onSubmit: jest.fn(),
    id: 'some-id',
    className: 'some-class'
  };
  let subject: ReactWrapper;

  useSelectorSpy(mockSelector);
  useDispatchSpy(mockDispatch);

  describe('on user creation success', () => {
    beforeEach(async () => {
      mockSelector.mockReturnValue(undefined);
      subject = mount(<AuthForm {...props}/>);
    });

    describe('on init', () => {
      describe('when name is empty', () => {
        it('should not be able to submit the candidate', () => {
          typeAndMove('#password', 'some password');
          subject.find('form').simulate('submit');

          expect(mockDispatch).not.toHaveBeenCalled();
        });
      });

      describe('when password is empty', () => {
        it('should not be able to submit the candidate', () => {
          typeAndMove('#username', 'some name');
          subject.find('form').simulate('submit');

          expect(mockDispatch).not.toHaveBeenCalled();
        });
      });

      describe('when username and password are given', () => {
        beforeEach(() => signIn(name, password));

        it('should be able to submit the candidate', () => {
          expect(subject.find('button').prop('disabled'))
            .toBe(false);
        });

        describe('on submit', () => {
          beforeEach(async () => {
            subject.find('form').simulate('submit',
              {preventDefault: mockPreventDefault});
          });

          it('should prevent the default behavior when submitting a form', () =>
            expect(mockPreventDefault).toHaveBeenCalled());

          it('should create the user', () => {
            expect(mockDispatch).toHaveBeenCalledWith(createNewUser(name, password));
          });

          it('should not be able to submit again', () =>
            expect(subject.find('button').prop('disabled'))
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
      mockSelector.mockReturnValue(errors);
      subject = mount(<AuthForm {...props}/>);
      signIn(name, password);
    });

    it('should not be able to submit', () =>
      expect(subject.find('button').prop('disabled'))
        .toBe(true));

    it('should not create the user', () =>
      expect(mockDispatch).not.toHaveBeenCalled());

    it('should display the errors', () =>
      expect(subject.find('#username').first().text())
        .toContain(message));

    describe('changing the name', () => {
      beforeEach(() => typeAndMove('#username', 'some name'));

      it('should be able to submit', () =>
        expect(subject.find('button').prop('disabled'))
          .toBe(false));

      describe('on submit', () => {
        beforeEach(() => subject.find('form')
          .simulate('submit'));

        it('should not be able to submit', () =>
          expect(subject.find('button').prop('disabled'))
            .toBe(true));

        it('should create the user', () =>
          expect(mockDispatch).toHaveBeenCalled());
      });
    });
  });

  const typeAndMove = (selector: string, value: string = ''): void => {
    subject.find(`${selector} input`).simulate('change', {target: {value}});
    subject.find(`${selector} input`).simulate('focus');
    subject.find(`${selector} input`).simulate('blur');
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
