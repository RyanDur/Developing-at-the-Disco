import {shallowRender} from '../../../../__tests__/support/testApi';
import * as React from 'react';
import {Main} from '../Main';
import {Signup} from '../../../user';

describe('the main section', () => {
  describe('when there is a user', () => {
    describe('when signup has ended', () => {
      it('should not have a way to sign up a user', async () => {
        const subject = await shallowRender(<Main {...{hasCurrentUser: true}}/>);
        subject.onSceneEnd();
        subject.onAnimationEnd();
        expect(subject.contains(<Signup/>)).not.toBeTruthy();
      });

      describe('when the scene has not ended', () => {
        it('should not have a way to sign up a user', async () => {
          const subject = await shallowRender(<Main {...{hasCurrentUser: true}}/>);
          subject.onAnimationEnd();
          expect(subject.contains(<Signup/>)).toBeTruthy();
        });
      });
    });

    describe('when signup has not ended', () => {
      it('should have a way to sign up a user', async () => {
        const subject = await shallowRender(<Main {...{hasCurrentUser: true}}/>);
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });
    });
  });

  describe('when there is no user', () => {
    describe('when signup ends', () => {
      it('should have a way to sign up a user ', async () => {
        const subject = await shallowRender(<Main {...{hasCurrentUser: false}}/>);
        await subject.onSceneEnd();
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });
    });

    describe('when signup has not ended', () => {
      it('should have a way to sign up a user', async () => {
        const subject = await shallowRender(<Main {...{hasCurrentUser: true}}/>);
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });
    });
  });
});
