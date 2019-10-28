import {shallowRender} from '../../../../__tests__/support/testApi';
import * as React from 'react';
import {Main} from '../Main';
import {Signup} from '../../../user';

describe('the main section', () => {
  describe('when there is a user', () => {
    it('should not have a way to sign up a user', async () => {
      const subject = await shallowRender(<Main {...{noCurrentUser: false, otherUsers: false}}/>);
      expect(subject.contains(<Signup/>)).not.toBeTruthy();
    });
  });

  describe('when there is no user', () => {
    it('should have a way to sign up a user ', async () => {
      const subject = await shallowRender(<Main {...{noCurrentUser: true, otherUsers: false}}/>);
      expect(subject.contains(<Signup/>)).toBeTruthy();
    });
  });
});
