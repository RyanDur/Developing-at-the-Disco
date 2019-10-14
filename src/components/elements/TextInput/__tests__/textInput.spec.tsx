import * as React from 'react';
import {render, TestRender} from '../../../../__tests__/support/testApi';
import {TextInput} from '../index';
import {TextInputProps} from '../types';

describe('the text input', () => {
  const text = 'Yay';
  const title = 'Some text';
  let textInput: TestRender = null;

  const createTextInput = (props: TextInputProps) => render(<TextInput {...props}/>);

  describe('without error', () => {
    const props = {onChange: jest.fn(), className: 'Some-name', maxLength: 10, placeHolder: title};

    beforeEach(async () => {
      textInput = await createTextInput(props);
    });

    it('should have a title', () => {
      expect(textInput.getBy('.text-label').innerHTML).toBe(title);
    });

    it('should add the given class name to the input', () => {
      expect(textInput.getBy('.text-input').classList).toContain(props.className);
    });

    it('should associate the input wth the label', () => {
      expect(textInput.getBy<HTMLLabelElement>('.text-label').htmlFor)
        .toEqual(textInput.getBy('.text').id);
    });

    it('should associate the input wth the label count', () => {
      expect(textInput.getBy<HTMLLabelElement>('.text-length').htmlFor)
        .toEqual(textInput.getBy('.text').id);
    });

    it('should not have a candidate name', () => {
      expect(textInput.getBy('.text-label').classList).not.toContain('candidate');
    });

    it('should not inform the text length there is a candidate', () => {
      expect(textInput.getBy('.text-length').classList).not.toContain('candidate');
    });

    describe('on focus', () => {
      it('should consider the candidate', () => {
        textInput.focus(textInput.getBy('.text'));
        expect(textInput.getBy('.text-label').classList).toContain('candidate');
      });

      describe('on blur', () => {
        it('should not consider the empty state a candidate', () => {
          textInput.blur(textInput.getBy('.text'));
          expect(textInput.getBy('.text-label').classList).not.toContain('candidate');
        });
      });
    });

    describe('given input', () => {
      beforeEach(() => {
        textInput.change(textInput.getBy('.text'), {target: {value: text}});
        textInput.focus(textInput.getBy('.text'));
      });

      it('should make the text a candidate.', () => {
        expect(textInput.getBy('.text-label').classList).toContain('candidate');
      });

      it('should trigger the passed in function', () => {
        expect(props.onChange).toHaveBeenCalledWith(text);
      });

      it('should not be longer than the max length given', () => {
        expect(textInput.getBy<HTMLInputElement>('.text').maxLength).toEqual(props.maxLength);
      });

      it('should inform the text length there is a candidate', () => {
        expect(textInput.getBy('.text-length').classList).toContain('candidate');
      });

      describe('blur input', () => {
        it('should remove candidacy if the input has no value', async () => {
          textInput.change(textInput.getBy('.text'), {target: {value: ''}});
          textInput.blur(textInput.getBy('.text'));
          expect(textInput.getBy('.text-label').classList).not.toContain('candidate');
        });

        it('should not remove candidacy if the input has a value', async () => {
          textInput.change(textInput.getBy('.text'), {target: {value: 'a'}});
          textInput.blur(textInput.getBy('.text'));
          expect(textInput.getBy('.text-label').classList).toContain('candidate');
        });
      });
    });
  });

  describe('with error', () => {
    const message = 'some error';
    const props = {errors: [message], onChange: jest.fn(), className: 'Some-name', maxLength: 10, placeHolder: title};

    beforeEach(async () => {
      textInput = await createTextInput(props);
    });

    it('should display the errors', () => {
      const errors = textInput.getBy('.errors');
      expect(errors).not.toBeNull();
      expect(errors.innerHTML).toContain(message);
    });
  });
});
