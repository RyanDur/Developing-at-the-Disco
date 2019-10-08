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
    it('should not have a candidate name', () => {
      expect(subject.getBy('.text-label').classList).not.toContain('candidate');
    });

    it('should not be able to submit the candidate', () => {
      expect(subject.getBy<HTMLButtonElement>('.submit').disabled).toBeTruthy();
    });

    describe('given input', () => {
      beforeEach(() => {
        subject.change(subject.getBy('.text'), {target: {value: name}});
        subject.focus(subject.getBy('.text'));
      });

      it('should make the text a candidate.', () => {
        expect(subject.getBy('.text-label').classList).toContain('candidate');
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
          subject.change(subject.getBy('.text'), {target: {value: ''}});
          subject.submit(subject.getBy('form'));

          expect(props.createUser).not.toHaveBeenCalled();
        });
      });

      describe('blur input', () => {
        it('should remove candidacy if the input has no value', async () => {
          subject.change(subject.getBy('.text'), {target: {value: ''}});
          subject.blur(subject.getBy('.text'));
          expect(subject.getBy('.text-label').classList).not.toContain('candidate');
        });

        it('should not remove candidacy if the input has a value', async () => {
          subject.change(subject.getBy('.text'), {target: {value: 'a'}});
          subject.blur(subject.getBy('.text'));
          expect(subject.getBy('.text-label').classList).toContain('candidate');
        });
      });
    });
  });
});
