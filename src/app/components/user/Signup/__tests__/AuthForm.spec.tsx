import * as React from 'react';
import {AuthForm} from '../AuthForm';
import {useDispatchSpy, useSelectorSpy} from '../../../../../__tests__/support/testApi';
import {mount, ReactWrapper} from 'enzyme';
import {create} from '../../../../store/user/action';

describe('Signing up', () => {
  const mockPreventDefault = jest.fn();
  const mockSelector = jest.fn();
  const mockDispatch = jest.fn();
  const name = 'YaY';
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
          typeAndMove('');
          subject.find('form').simulate('submit');

          expect(subject.find('.submit').props().disabled)
            .toBe(true);
        });
      });

      describe('given input', () => {
        beforeEach(() => typeAndMove(name));

        it('should be able to submit the candidate', () => {
          expect(subject.find('.submit').prop('disabled'))
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
            expect(mockDispatch).toHaveBeenCalledWith(create(name));
          });

          it('should not be able to submit again', () =>
            expect(subject.find('.submit').prop('disabled'))
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
      typeAndMove(name);
    });

    it('should not be able to submit', () =>
      expect(subject.find('.submit').prop('disabled'))
        .toBe(true));

    it('should not create the user', () =>
      expect(mockDispatch).not.toHaveBeenCalled());

    it('should display the errors', () =>
      expect(subject.find('#username').first().text())
        .toContain(message));

    describe('changing the name', () => {
      beforeEach(() => typeAndMove('some name'));

      it('should be able to submit', () =>
        expect(subject.find('.submit').prop('disabled'))
          .toBe(false));

      describe('on submit', () => {
        beforeEach(() => subject.find('form')
          .simulate('submit'));

        it('should not be able to submit', () =>
          expect(subject.find('.submit').prop('disabled'))
            .toBe(true));

        it('should create the user', () =>
          expect(mockDispatch).toHaveBeenCalled());
      });
    });
  });

  const typeAndMove = (value: string): void => {
    subject.find('#username input').simulate('change', {target: {value}});
    subject.find('#username input').simulate('focus');
    subject.find('#username input').simulate('blur');
  };
});

jest.mock('../../../../../config', () => ({
  endpoint: {
    users: 'I am an endpoint'
  },
  maxUsernameLength: 30
}));
