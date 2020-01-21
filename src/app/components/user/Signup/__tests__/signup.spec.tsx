import * as React from 'react';
import {Signup} from '../Signup';
import {create} from '../../../../store/user/action';
import {
  render,
  TestRender,
  useDispatchSpy,
  useSelectorSpy
} from '../../../../__tests__/support/testApi';
import {Path} from '../../../index';

const mockHistoryPush = jest.fn();

describe('Signing up', () => {
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const name = 'YaY';
  useDispatchSpy(mockDispatch);
  useSelectorSpy(mockSelector);
  let subject: TestRender;

  describe('on user creation success', () => {
    beforeEach(async () => {
      mockSelector
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce(undefined)
        .mockReturnValueOnce({foo: 'bar'})
        .mockReturnValueOnce(undefined);
      subject = await render(<Signup/>);
    });

    describe('on init', () => {
      describe('when name is empty', () => {
        it('should not be able to submit the candidate', () => {
          mockDispatch.mockReset();

          subject.change(subject.getBy('.username input'), {target: {value: ''}});
          subject.blur(subject.getBy('.username input'));
          subject.submit(subject.getBy('form'));

          expect(mockDispatch).not.toHaveBeenCalled();
        });
      });

      describe('given input', () => {
        beforeEach(() => {
          subject.change(subject.getBy('.username input'), {target: {value: name}});
          subject.focus(subject.getBy('.username input'));
        });

        it('should be able to submit the candidate', () => {
          expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeFalsy();
        });

        describe('on submit', () => {
          beforeEach(async () => {
            subject.submit(subject.getBy('form'),
              {preventDefault: mockPreventDefault});
          });

          it('should create a user', () =>
            expect(mockDispatch).toHaveBeenCalledWith(create(name)));

          it('should prevent the default behavior when submitting a form', () =>
            expect(mockPreventDefault).toHaveBeenCalled());

          it('should not be able to submit again', () =>
            expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());

          it('should update the url', () => {
            expect(mockHistoryPush).toHaveBeenCalledWith(Path.HOME);
          });
        });
      });
    });
  });

  describe('when name already exists', () => {
    const message = 'Username already exists.';
    const errors = {value: name, validations: ['USERNAME_EXISTS']};

    beforeEach(async () => {
      mockSelector.mockImplementation(() => errors);
      subject = await render(<Signup/>);
      subject.change(subject.getBy('.username input'), {target: {value: name}});
      subject.focus(subject.getBy('.username input'));
    });

    it('should not be able to submit', () =>
      expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());

    it('should display the errors', () =>
      expect(subject.getBy('.username').innerHTML).toContain(message));

    describe('changing the name', () => {
      beforeEach(() => {
        subject.change(subject.getBy('.username input'), {target: {value: 'some name'}});
        subject.focus(subject.getBy('.username input'));
      });

      it('should be able to submit', () =>
        expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeFalsy());

      describe('on submit', () => {
        beforeEach(() => subject.submit(subject.getBy('form')));

        it('should not be able to submit', () =>
          expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());
      });
    });
  });
})
;

jest.mock('../../../../../config', () => ({
  endpoint: {
    users: 'I am an endpoint'
  },
  maxUsernameLength: 30
}));

// noinspection JSUnusedGlobalSymbols
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush
  })
}));
