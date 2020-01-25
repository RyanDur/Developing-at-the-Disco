import * as React from 'react';
import {mount, ReactWrapper} from 'enzyme';
import {FancyInput} from '../FancyInput';

fdescribe('the fancy input', () => {
  const text = 'Yay';
  const title = 'Some text';
  const props = {
    id: 'some-id',
    maxLength: 10,
    className: 'some-name',
    placeHolder: title,
    onChange: jest.fn(),
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    type: 'text'
  };
  let fancyInput: ReactWrapper;

  describe('without error', () => {
    beforeEach(() => {
      fancyInput = mount(<FancyInput {...props}/>);
    });

    describe('without a value', () => {

      it('should have a title', () => {
        expect(fancyInput.find('.title').text()).toBe(title);
      });

      it('should add the given class name to the input', () =>
        expect(fancyInput.find('.fancy-input')
          .hasClass(props.className))
          .toBe(true));

      it.each`
      className
      ${'.title'}
      ${'.max-length'}
      `('should associate the input wth the label', ({className}) =>
        expect(fancyInput.find(className).prop('htmlFor'))
          .toEqual(fancyInput.find('.fancy').props().id));

      it.each`
      className
      ${'.fancy'}
      ${'.title'}
      ${'.max-length'}
      `('should not have a candidate name', ({className}) =>
        expect(fancyInput.find(className)
          .hasClass('candidate'))
          .not.toBe(true));

      describe('on focus', () => {
        beforeEach(() => fancyInput
          .find('.fancy')
          .simulate('focus'));

        it('should consider the candidate', () =>
          expect(fancyInput.find('.fancy-input')
            .hasClass('candidate'))
            .toBe(true));

        describe('on blur', () => {
          beforeEach(() => fancyInput
            .find('.fancy')
            .simulate('blur'));

          it.each`
          className
          ${'.fancy'}
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
        typeAndMove(text);
      });

      it('should make a candidate.', () =>
        expect(fancyInput.find('.fancy-input')
          .hasClass('candidate'))
          .toBe(true));

      it.each`
      func
      ${props.onChange}
      ${props.onFocus}
      ${props.onBlur}
      `('should trigger the passed in function', ({func}) =>
        expect(func).toHaveBeenCalled());

      it('should not be longer than the max length given', () =>
        expect(fancyInput.find('.fancy').prop('maxLength'))
          .toEqual(props.maxLength));

      describe('blur input', () => {
        it('should remove candidacy if the input has no value', () => {
          typeAndMove();
          expect(fancyInput.find('.fancy-input')
            .hasClass('candidate'))
            .not.toBe(true);
        });

        it('should not remove candidacy if the input has a value', () => {
          typeAndMove('a');
          expect(fancyInput.find('.fancy-input')
            .hasClass('candidate'))
            .toBe(true);
        });
      });
    });
  });

  describe('with error', () => {
    const errors = {value: 'some error', validations: ['some validation']};

    beforeEach(() => {
      fancyInput = mount(<FancyInput {...props} errors={errors}/>);
      fancyInput.find('.fancy')
        .simulate('change', {target: {value: errors.value}});
    });

    it('should be marked as invalid', () =>
      expect(fancyInput.find('.fancy-input')
        .hasClass('invalid'))
        .toBe(true));

    it('should display the errors', () => {
      const errorsElement = fancyInput.find('.errors');
      expect(errorsElement).not.toBeNull();
      expect(errorsElement.first().text()).toContain(errors.validations[0]);
    });

    describe('fixing the input', () => {
      beforeEach(() => fancyInput.find('.fancy')
        .simulate('change', {target: {value: 'different'}}));

      it('should be marked as invalid', () =>
        expect(fancyInput.find('.fancy-input').hasClass('invalid'))
          .not.toBe(true));
    });
  });

  const typeAndMove = (value = '') => {
    fancyInput.find('.fancy')
      .simulate('change', {target: {value}})
      .simulate('focus')
      .simulate('blur');
  };
});
