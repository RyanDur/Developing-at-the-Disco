import {shallowRender, useSelectorSpy} from '../../../../__tests__/support/testApi';
import * as React from 'react';
import {Header} from '../Header';
import {Info} from '../../../user';

describe('the header section', () => {
  const mockSelector = jest.fn();
  useSelectorSpy(mockSelector);

  describe('when there is a user', () => {
    it('should have the current users information', async () => {
      mockSelector.mockImplementation(() => true);
      const subject = await shallowRender(<Header/>);
      expect(subject.contains(<Info/>)).toBeTruthy();
    });
  });

  describe('when there is no user', () => {
    it('should not have any user information', async () => {
      mockSelector.mockImplementation(() => false);
      const subject = await shallowRender(<Header/>);
      expect(subject.contains(<Info/>)).not.toBeTruthy();
    });
  });
});
