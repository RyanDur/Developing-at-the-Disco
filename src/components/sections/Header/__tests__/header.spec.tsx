import {shallowRender} from '../../../../__tests__/support/testApi';
import * as React from 'react';
import {Header} from '../Header';
import {Info} from '../../../user';

describe('the header section', () => {
  describe('when there is a user', () => {
    it('should have the current users information', async () => {
      const subject = await shallowRender(<Header {...{hasCurrentUser: true}}/>);
      expect(subject.contains(<Info/>)).toBeTruthy();
    });
  });

  describe('when there is no user', () => {
    it('should not have any user information', async () => {
      const subject = await shallowRender(<Header {...{hasCurrentUser: false}}/>);
      expect(subject.contains(<Info/>)).not.toBeTruthy();
    });
  });
});
