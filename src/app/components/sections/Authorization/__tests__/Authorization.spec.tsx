import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {Authorization} from '../Authorization';
import {useSelectorSpy} from '../../../../../__tests__/support/testApi';
import {AuthForm} from '../../../user';
import {Redirect} from 'react-router-dom';
import {Path} from '../../../index';

describe('authorization', () => {
  const mockSelector = jest.fn();
  useSelectorSpy(mockSelector);
  let auth: ShallowWrapper;

  describe('when not authorized', () => {
    beforeEach(() => {
      auth = shallow(<Authorization/>);
    });

    it('should show authorization', () =>
      expect(auth.find('.authorization').exists())
        .toBe(true));
  });

  describe('when authorized', () => {
    beforeEach(() => {
      mockSelector.mockReturnValue({name: 'USER'});
      auth = shallow(<Authorization/>);
    });

    describe('when the internal scene has ended', () => {
      beforeEach(() => auth.find(AuthForm).props().onSceneEnd());

      it('should not show authorization', () =>
        expect(auth.find('.authorization').hasClass('remove'))
          .toBe(true));

      describe('when it has left the page', () => {
        beforeEach(() => auth.find(AuthForm).simulate('animationend'));

        it('should redirect to home', () =>
          expect(auth.find(Redirect).props().to).toBe(Path.HOME));
      });
    });
  });
});
