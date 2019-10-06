import * as React from 'react';
import {Signup} from '../Signup';
import {render} from '../../../../__tests__/support/testApi';

describe('Signing up', () => {
  const props = {createUser: jest.fn()};
  const name = 'YaY';
  describe('on submit', () => {
    it('should create a user with the name', async () => {
      const {getBy, change, submit} = await render(<Signup {...props}/>);

      change(getBy('.name'), {target: {value: name}});
      submit(getBy('form'));

      expect(props.createUser).toHaveBeenCalledWith(name);
    });
  });

  describe('when name is empty', () => {
    describe('on input', () => {
      it('should make the name a candidate.', async () => {
        const {getBy, change, focus} = await render(<Signup {...props}/>);
        change(getBy('.name'), {target: {value: name}});
        focus(getBy('.name'));
        expect(getBy('.name-label').classList).toContain('candidate');
      });

      it('should remove candidacy if no input and not focused', async () => {
        const {getBy, change, focus, blur} = await render(<Signup {...props}/>);
        change(getBy('.name'), {target: {value: name}});
        focus(getBy('.name'));
        change(getBy('.name'), {target: {value: ''}});
        blur(getBy('.name'));
        expect(getBy('.name-label').classList).not.toContain('candidate');
      });

      it('should remove candidacy if it has input and not focused', async () => {
        const {getBy, change, focus, blur} = await render(<Signup {...props}/>);
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
