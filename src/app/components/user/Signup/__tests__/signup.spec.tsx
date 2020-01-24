import * as React from 'react';
import {Signup} from '../Signup';
import {create} from '../../../../store/user/action';
import {useDispatchSpy, useSelectorSpy} from '../../../../../__tests__/support/testApi';
import {mount, ReactWrapper} from 'enzyme';

describe('Signing up', () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const name = 'YaY';
  useDispatchSpy(mockDispatch);
  useSelectorSpy(mockSelector);
  let subject: ReactWrapper;

  describe('on user creation success', () => {
    beforeEach(async () => {
      mockSelector.mockReturnValue(undefined);
      subject = mount(<Signup/>);
    });

    describe('on init', () => {
      describe('when name is empty', () => {
        it('should not be able to submit the candidate', () => {
          mockDispatch.mockReset();
          subject.find('.username input').simulate('change', {target: {value: ''}});
          subject.find('.username input').simulate('blur');
          subject.find('form').simulate('submit');

          expect(mockDispatch).not.toHaveBeenCalled();
        });
      });

      describe('given input', () => {
        beforeEach(() => {
          subject.find('.username input').simulate('change', {target: {value: name}});
          subject.find('.username input').simulate('blur');
        });

        it('should be able to submit the candidate', () => {
          expect(subject.find('.submit').prop('disabled')).toBe(false);
        });

        describe('on submit', () => {
          beforeEach(async () => {
            subject.find('form').simulate('submit',
              {preventDefault: mockPreventDefault});
          });

          it('should create a user', () =>
            expect(mockDispatch).toHaveBeenCalledWith(create(name)));

          it('should prevent the default behavior when submitting a form', () =>
            expect(mockPreventDefault).toHaveBeenCalled());

          it('should not be able to submit again', () =>
            expect(subject.find('.submit').prop('disabled')).toBe(true));
        });
      });
    });
  });

  describe('when name already exists', () => {
    const message = 'Username already exists.';
    const errors = {value: name, validations: ['USERNAME_EXISTS']};

    beforeEach(() => {
      mockSelector.mockReturnValue(errors);
      subject = mount(<Signup/>);
      subject.find('.username input').simulate('change', {target: {value: name}});
      subject.find('.username input').simulate('focus');
    });

    it('should not be able to submit', () =>
      expect(subject.find('.submit').prop('disabled')).toBe(true));

    it('should display the errors', () =>
      expect(subject.find('.username').first().text()).toContain(message));

    describe('changing the name', () => {
      beforeEach(() => {
        subject.find('.username input').simulate('change', {target: {value: 'some name'}});
        subject.find('.username input').simulate('focus');
      });

      it('should be able to submit', () =>
        expect(subject.find('.submit').prop('disabled')).toBe(false));

      describe('on submit', () => {
        beforeEach(() => subject.find('form').simulate('submit'));

        it('should not be able to submit', () =>
          expect(subject.find('.submit').prop('disabled')).toBe(true));
      });
    });
  });
});

jest.mock('../../../../../config', () => ({
  endpoint: {
    users: 'I am an endpoint'
  },
  maxUsernameLength: 30
}));
