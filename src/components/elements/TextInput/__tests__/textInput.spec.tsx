import * as React from 'react';
import {render, TestRender} from '../../../../__tests__/support/testApi';
import {TextInput} from '../index';

describe('the text input', () => {
  const props = {onChange: jest.fn(), className: 'Some-name', maxLength: 10};
  const title = 'Some text';
  const text = 'Yay';
  let subject: TestRender = null;

  beforeEach(async () => {
    subject = await render(<TextInput {...props}>{title}</TextInput>);
  });

  it('should have a title', () => {
    expect(subject.getBy('.text-label').innerHTML).toBe(title);
  });

  it('should add the given class name to the input', () => {
    expect(subject.getBy('.text').classList).toContain(props.className);
  });

  it('should associate the input wth the label', () => {
    expect(subject.getBy<HTMLLabelElement>('.text-label').htmlFor)
      .toEqual(subject.getBy('.text').id);
  });

  it('should associate the input wth the label count', () => {
    expect(subject.getBy<HTMLLabelElement>('.text-length').htmlFor)
      .toEqual(subject.getBy('.text').id);
  });

  it('should not have a candidate name', () => {
    expect(subject.getBy('.text-label').classList).not.toContain('candidate');
  });

  it('should not inform the text length there is a candidate', () => {
    expect(subject.getBy('.text-length').classList).not.toContain('candidate');
  });

  describe('on focus', () => {
    it('should consider the candidate', () => {
      subject.focus(subject.getBy('.text'));
      expect(subject.getBy('.text-label').classList).toContain('candidate');
    });

    describe('on blur', () => {
      it('should not consider the empty state a candidate', () => {
        subject.blur(subject.getBy('.text'));
        expect(subject.getBy('.text-label').classList).not.toContain('candidate');
      });
    });
  });

  describe('given input', () => {
    beforeEach(() => {
      subject.change(subject.getBy('.text'), {target: {value: text}});
      subject.focus(subject.getBy('.text'));
    });

    it('should make the text a candidate.', () => {
      expect(subject.getBy('.text-label').classList).toContain('candidate');
    });

    it('should trigger the passed in function', () => {
      expect(props.onChange).toHaveBeenCalledWith(text);
    });

    it('should not be longer than the max length given', () => {
      expect(subject.getBy<HTMLInputElement>('.text').maxLength).toEqual(props.maxLength);
    });

    it('should inform the text length there is a candidate', () => {
      expect(subject.getBy('.text-length').classList).toContain('candidate');
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
