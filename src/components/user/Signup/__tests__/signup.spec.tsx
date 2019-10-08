import * as React from 'react';
import {Signup} from '../Signup';
import {render, TestRender} from '../../../../__tests__/support/testApi';

describe('Signing up', () => {
  const props = {createUser: jest.fn()};
  const mockPreventDefault = jest.fn();
  const name = 'YaY';
  let subject: TestRender = null;

  beforeEach(async () => {
    subject = await render(<Signup {...props}/>);
  });

  describe('when name is empty', () => {
    it('should not be able to submit the candidate', () => {
      expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy();
    });

    describe('given input', () => {
      beforeEach(() => {
        subject.change(subject.getBy('.name'), {target: {value: name}});
        subject.focus(subject.getBy('.name'));
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
          subject.change(subject.getBy('.name'), {target: {value: ''}});
          subject.submit(subject.getBy('form'));

          expect(props.createUser).not.toHaveBeenCalled();
        });
      });
    });
  });
});
