import * as React from 'react';
import {Signup} from '../Signup';
import {render} from '../../../../__tests__/support/testApi';

describe('Signing up', () => {
  describe('on submit', () => {
    it('should create a user with the name', async () => {
      const name = 'YaY';
      const props = {createUser: jest.fn()};
      const {getBy, change, submit} = await render(<Signup {...props}/>);

      change(getBy('.name'), {target: {value: name}});
      submit(getBy('form'));

      expect(props.createUser).toHaveBeenCalledWith(name);
    });
  });
})
;
