import * as React from 'react';
import {FancyInput} from '../index';
import {TextInputProps} from '../types';
import {mount, ReactWrapper} from 'enzyme';

describe('the fancy input', () => {
  const text = 'Yay';
  const title = 'Some text';
  const baseProps = {
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    type: 'text',
    className: 'Some-name',
    maxLength: 10,
    placeHolder: title
  };
  let fancyInput: ReactWrapper;

  const createTextInput = (props: TextInputProps) => mount(<FancyInput {...props}/>);

  describe('without a value', () => {
    beforeEach(() => fancyInput = createTextInput(baseProps));

    it('should have a title', () =>
      expect(fancyInput.find('.title').text()).toBe(title));

    it('should add the given class name to the input', () =>
      expect(fancyInput.find('.fancy-input')
        .hasClass(baseProps.className))
        .toBe(true));

    it.each`
      className
      ${'.title'}
      ${'.max-length'}
      `('should associate the input wth the label', ({className}) =>
      expect(fancyInput.find(className).prop('htmlFor'))
        .toEqual(fancyInput.find('.fancy-input').prop('id')));

    it.each`
      className
      ${'.fancy-input'}
      ${'.title'}
      ${'.max-length'}
      `('should not have a candidate name', ({className}) =>
      expect(fancyInput.find(className)
        .hasClass('candidate'))
        .not.toBe(true));

    describe('on focus', () => {
      beforeEach(() => fancyInput
        .find('.fancy-input')
        .simulate('focus'));

      it.each`
        className
        ${'.fancy-input'}
        ${'.title'}
        ${'.max-length'}
        `('should consider the candidate', ({className}) =>
        expect(fancyInput.find(className)
          .hasClass('candidate'))
          .toBe(true));

      describe('on blur', () => {
        beforeEach(() => fancyInput
          .find('.fancy-input')
          .simulate('blur'));

        it.each`
          className
          ${'.fancy-input'}
          ${'.title'}
          ${'.max-length'}
          `('should not consider the empty state a candidate', ({className}) =>
          expect(fancyInput.find(className)
            .hasClass('candidate'))
            .not.toBe(true));
      });
    });
  });

  describe('with a value', () => {
    beforeEach(() => {
      fancyInput = createTextInput(baseProps);
      typeAndMove(text);
    });

    it.each`
      className
      ${'.fancy-input'}
      ${'.title'}
      ${'.max-length'}
      `('should make a candidate.', ({className}) =>
      expect(fancyInput.find(className)
        .hasClass('candidate'))
        .toBe(true));

    it.each`
      func
      ${baseProps.onChange}
      ${baseProps.onFocus}
      ${baseProps.onBlur}
      `('should trigger the passed in function', ({func}) =>
      expect(func).toHaveBeenCalled());

    it('should not be longer than the max length given', () =>
      expect(fancyInput.find('.fancy-input').prop('maxLength'))
        .toEqual(baseProps.maxLength));

    describe('blur input', () => {
      it.each`
        className
        ${'.fancy-input'}
        ${'.title'}
        ${'.max-length'}
      `('should remove candidacy if the input has no value', ({className}) => {
        typeAndMove();
        expect(fancyInput.find(className)
          .hasClass('candidate'))
          .not.toBe(true);
      });

      it.each`
        className
        ${'.fancy-input'}
        ${'.title'}
        ${'.max-length'}
      `('should not remove candidacy if the input has a value', ({className}) => {
        typeAndMove('a');
        expect(fancyInput.find(className)
          .hasClass('candidate'))
          .toBe(true);
      });
    });
  });

  describe('with error', () => {
    const errors = {value: 'some error', validations: ['some validation']};

    const props = {errors, onChange: jest.fn(), className: 'Some-name', maxLength: 10, placeHolder: title};

    beforeEach(() => {
      fancyInput = createTextInput(props);
      fancyInput.find('.fancy-input')
        .simulate('change', {target: {value: errors.value}});
    });

    it.each`
      className
      ${'.fancy-input'}
      ${'.title'}
      ${'.max-length'}
    `('should be marked as invalid', ({className}) =>
      expect(fancyInput.find(className).hasClass('invalid'))
        .toBe(true));

    it('should display the errors', () => {
      const errorsElement = fancyInput.find('.errors');
      expect(errorsElement).not.toBeNull();
      expect(errorsElement.first().text()).toContain(errors.validations[0]);
    });

    describe('fixing the input', () => {
      beforeEach(() => fancyInput.find('.fancy-input')
        .simulate('change', {target: {value: 'different'}}));

      it.each`
        className
        ${'.fancy-input'}
        ${'.title'}
        ${'.max-length'}
      `('should be marked as invalid', ({className}) =>
        expect(fancyInput.find(className).hasClass('invalid'))
          .not.toBe(true));

      it('should not display the errors', () =>
        expect(fancyInput.find('.errors').exists())
          .toBe(false));
    });
  });

  const typeAndMove = (value = '') => {
    fancyInput.find('.fancy-input')
      .simulate('change', {target: {value}})
      .simulate('focus')
      .simulate('blur');
  };
});
