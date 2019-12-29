import * as React from 'react';
import {Signup} from '../Signup';
import {render, TestRender, useDispatchSpy, useSelectorSpy} from '../../../../__tests__/support/testApi';
import {create} from '../../store/actions';
import {translate} from '../selectors';

jest.mock('../../../../config', () => ({
  maxUsernameLength: 30
}));

describe('Signing up', () => {
  const props = {
    onSceneEnd: jest.fn()
  };
  const mockPreventDefault = jest.fn();
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const name = 'YaY';
  useDispatchSpy(mockDispatch);
  useSelectorSpy(mockSelector);

  let subject: TestRender = null;

  beforeEach(props.onSceneEnd.mockReset);

  describe('when name is empty', () => {
    beforeEach(async () => subject = await render(<Signup {...props}/>));

    it('should not be able to submit the candidate', () =>
      expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());

    describe('given input', () => {
      beforeEach(() => {
        subject.change(subject.getBy('.username input'), {target: {value: name}});
        subject.focus(subject.getBy('.username input'));
      });

      it('should be able to submit the candidate', () =>
        expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeFalsy());

      describe('on submit', () => {

        describe('with a valid name', () => {
          beforeEach(() => subject.submit(subject.getBy('form'),
            {preventDefault: mockPreventDefault}));

          it('should create a user', () =>
            expect(mockDispatch).toHaveBeenCalledWith(create(name)));

          it('should prevent the default behavior when submitting a form', () =>
            expect(mockPreventDefault).toHaveBeenCalled());

          it('should end the scene', () => {
            subject.transition(subject.getBy('button'));
            expect(props.onSceneEnd).toHaveBeenCalledTimes(1);
          });

          it('should not be able to submit again', () =>
            expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());
        });

        describe('with an invalid name', () => {
          describe('when name is empty', () => {
            it('should be disabled if input is empty', () => {
              mockDispatch.mockReset();

              subject.change(subject.getBy('.username input'), {target: {value: ''}});
              subject.blur(subject.getBy('.username input'));
              subject.submit(subject.getBy('form'));

              expect(mockDispatch).not.toHaveBeenCalled();
            });
          });

          describe('when name already exists', () => {
            const message = 'Username already exists.';
            const errors = {value: name, validations: ['USERNAME_EXISTS']};

            beforeEach(async () => {
              mockSelector.mockImplementation(() => translate(errors));
              subject = await render(<Signup {...props}/>);
              subject.change(subject.getBy('.username input'), {target: {value: name}});
              subject.focus(subject.getBy('.username input'));
            });

            it('should not be able to submit', () =>
              expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());

            it('should display the errors', () =>
              expect(subject.getBy('.username').innerHTML).toContain(message));

            it('should not end the scene', () => {
              subject.transition(subject.getBy('button'));
              expect(props.onSceneEnd).not.toHaveBeenCalled();
            });

            describe('changing the name', () => {
              beforeEach(() => {
                subject.change(subject.getBy('.username input'), {target: {value: 'some name'}});
                subject.focus(subject.getBy('.username input'));
              });

              it('should be able to submit', () =>
                expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeFalsy());

              describe('on submit', () => {
                beforeEach(() => subject.submit(subject.getBy('form')));

                it('should end the scene', () => {
                  subject.transition(subject.getBy('button'));
                  expect(props.onSceneEnd).toHaveBeenCalledTimes(1);
                });

                it('should not be able to submit', () =>
                  expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy());
              });
            });
          });
        });
      });
    });
  });
});
