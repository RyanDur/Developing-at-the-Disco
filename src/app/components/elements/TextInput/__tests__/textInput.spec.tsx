import * as React from 'react';
import {TextInput} from '../index';
import {TextInputProps} from '../types';
import {mount, ReactWrapper} from 'enzyme';

describe('the text input', () => {
  const text = 'Yay';
  const title = 'Some text';
  let textInput: ReactWrapper;

  const createTextInput = (props: TextInputProps) => mount(<TextInput {...props}/>);

  describe('without error', () => {
    const props = {onChange: jest.fn(), className: 'Some-name', maxLength: 10, placeHolder: title};

    beforeEach(() => {
      textInput = createTextInput(props);
    });

    it('should have a title', () => {
      expect(textInput.find('.title').text()).toBe(title);
    });

    it('should add the given class name to the input', () => {
      expect(textInput.find('.text-input').hasClass(props.className)).toBe(true);
    });

    it('should associate the input wth the label', () => {
      expect(textInput.find('.title').prop('htmlFor'))
        .toEqual(textInput.find('.text').prop('id'));
    });

    it('should associate the input wth the label count', () => {
      expect(textInput.find('.max-length').prop('htmlFor'))
        .toEqual(textInput.find('.text').prop('id'));
    });

    it('should not have a candidate name', () => {
      expect(textInput.find('.text-input').hasClass('candidate')).not.toBe(true);
    });

    describe('on focus', () => {
      beforeEach(() => {
        textInput.find('.text').simulate('focus');
      });

      it('should consider the candidate', () => {
        expect(textInput.find('.text-input').hasClass('candidate')).toBe(true);
      });

      describe('on blur', () => {
        beforeEach(() => {
          textInput.find('.text').simulate('blur');
        });

        it('should not consider the empty state a candidate', () => {
          expect(textInput.find('.text-input').hasClass('candidate')).not.toBe(true);
        });
      });
    });

    describe('given input', () => {
      beforeEach(() => {
        textInput.find('.text').simulate('change', {target: {value: text}});
        textInput.find('.text').simulate('focus');
      });

      it('should make the input a candidate.', () => {
        expect(textInput.find('.text-input').hasClass('candidate')).toBe(true);
      });

      it('should trigger the passed in function', () => {
        expect(props.onChange).toHaveBeenCalledWith(text);
      });

      it('should not be longer than the max length given', () => {
        expect(textInput.find('.text').prop('maxLength')).toEqual(props.maxLength);
      });

      describe('blur input', () => {
        it('should remove candidacy if the input has no value', async () => {
          textInput.find('.text').simulate('change', {target: {value: ''}});
          textInput.find('.text').simulate('blur');

          expect(textInput.find('.text-input').hasClass('candidate')).not.toBe(true);
        });

        it('should not remove candidacy if the input has a value', async () => {
          textInput.find('.text').simulate('change', {target: {value: 'a'}});
          textInput.find('.text').simulate('blur');

          expect(textInput.find('.text-input').hasClass('candidate')).toBe(true);
        });
      });
    });
  });

  describe('with error', () => {
    const errors = {value: 'some error', validations: ['some validation']};

    const props = {errors, onChange: jest.fn(), className: 'Some-name', maxLength: 10, placeHolder: title};

    beforeEach(() => {
      textInput = createTextInput(props);
      textInput.find('.text').simulate('change', {target: {value: errors.value}});
    });

    it('should display the errors', () => {
      const errorsElement = textInput.find('.errors');
      expect(errorsElement).not.toBeNull();
      expect(errorsElement.first().text()).toContain(errors.validations[0]);
    });

    it('should be marked as invalid', () => {
      expect(textInput.find('.text-input').hasClass('invalid')).toBe(true);
    });

    describe('fixing the input', () => {
      beforeEach(() => {
        textInput.find('.text').simulate('change', {target: {value: 'different'}});
      });

      it('should unmark the input as invalid', () => {
        expect(textInput.find('.text-input').hasClass('invalid')).not.toBe(true);
      });

      it('should not display the errors', () => {
        expect(textInput.find('.errors').exists()).toBe(false);
      });
    });
  });
});
