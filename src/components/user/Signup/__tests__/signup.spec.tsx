import * as React from 'react';
import {Signup} from '../Signup';
import {render, TestRender} from '../../../../__tests__/support/testApi';

jest.mock('../../../../config', () => ({
  maxUsernameLength: 30
}));

describe('Signing up', () => {
  const props = {createUser: jest.fn()};
  const mockPreventDefault = jest.fn();
  const name = 'YaY';
  let subject: TestRender = null;

  describe('when name is empty', () => {
    beforeEach(async () => {
      subject = await render(<Signup {...props}/>);
    });

    it('should not be able to submit the candidate', () => {
      expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy();
    });

    describe('given input', () => {
      beforeEach(() => {
        subject.change(subject.getBy('.username input'), {target: {value: name}});
        subject.focus(subject.getBy('.username input'));
      });

      it('should not be able to submit the candidate', () => {
        expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeFalsy();
      });

      describe('on submit', () => {
        beforeEach(() => {
          props.createUser.mockReset();
        });

        it('should create a user with the text', () => {
          subject.submit(subject.getBy('form'));

          expect(props.createUser).toHaveBeenCalledWith(name);
        });

        it('should prevent the default behavior when submitting a form', () => {
          subject.submit(subject.getBy('form'), {preventDefault: mockPreventDefault});

          expect(mockPreventDefault).toHaveBeenCalled();
        });

        it('should be disabled if input is empty', () => {
          subject.change(subject.getBy('.username input'), {target: {value: ''}});
          subject.blur(subject.getBy('.username input'));
          subject.submit(subject.getBy('form'));

          expect(props.createUser).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('when name already exists', () => {
    const message = 'Username already exists.';
    const errors = {value: name, validations: ['USERNAME_EXISTS']};

    beforeEach(async () => {
      subject = await render(<Signup userNameErrors={errors} {...props}/>);
      subject.change(subject.getBy('.username input'), {target: {value: name}});
      subject.focus(subject.getBy('.username input'));
    });

    it('should not be able to submit', () => {
      expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy();
    });

    it('should display the errors', () => {
      expect(subject.getBy('.username').innerHTML).toContain(message);
    });

    describe('change the name', () => {
      it('should not be able to submit', () => {
        subject.change(subject.getBy('.username input'), {target: {value: 'some name'}});
        subject.focus(subject.getBy('.username input'));
        expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeFalsy();
      });
    });
  });
});
