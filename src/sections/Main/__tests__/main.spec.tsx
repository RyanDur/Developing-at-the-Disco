import {shallowRender} from '../../../__tests__/support/testApi';
import {Signup} from '../../../components/user';
import * as React from 'react';
import {Main} from '../Main';

describe('the main section', () => {
  describe('when there is a user', () => {
    it('should not have a way to sign up a user', async () => {
      const subject = await shallowRender(<Main {...{noCurrentUser: false}}/>);
      expect(subject.contains(<Signup/>)).not.toBeTruthy();
    });
  });

  describe('when there is no user', () => {
    it('should have a way to sign up a user ', async () => {
      const subject = await shallowRender(<Main {...{noCurrentUser: true}}/>);
      expect(subject.contains(<Signup/>)).toBeTruthy();
    });
  });
});
