import * as React from 'react';
import {Signup} from '../Signup';
import {render, TestRender} from '../../../../__tests__/support/testApi';

describe('Signing up', () => {
  const props = {createUser: jest.fn()};
  const mockPreventDefault = jest.fn();
  const name = 'YaY';
  let subject: TestRender;
  beforeEach(async () => {
    subject = await render(<Signup {...props}/>);
  });

  describe('on submit', () => {
    it('should create a user with the name', () => {
      const {getBy, change, submit} = subject;
      change(getBy('.name'), {target: {value: name}});
      submit(getBy('form'));

      expect(props.createUser).toHaveBeenCalledWith(name);
    });

    it('should prevent the default behavior when submitting a form', () => {
      const {getBy, submit} = subject;
      submit(getBy('form'), {preventDefault: mockPreventDefault});

      expect(mockPreventDefault).toHaveBeenCalled();
    });
  });

  describe('when name is empty', () => {
    describe('on input', () => {
      it('should make the name a candidate.', () => {
        const {getBy, change, focus} = subject;
        change(getBy('.name'), {target: {value: name}});
        focus(getBy('.name'));
        expect(getBy('.name-label').classList).toContain('candidate');
      });

      it('should remove candidacy if no input and not focused', async () => {
        const {getBy, change, focus, blur} = subject;
        change(getBy('.name'), {target: {value: name}});
        focus(getBy('.name'));
        change(getBy('.name'), {target: {value: ''}});
        blur(getBy('.name'));
        expect(getBy('.name-label').classList).not.toContain('candidate');
      });

      it('should remove candidacy if it has input and not focused', async () => {
        const {getBy, change, focus, blur} = subject;
        change(getBy('.name'), {target: {value: name}});
        focus(getBy('.name'));
        change(getBy('.name'), {target: {value: 'a'}});
        blur(getBy('.name'));
        expect(getBy('.name-label').classList).toContain('candidate');
      });
    });
  });
})
;
