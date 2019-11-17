import {render, shallowRender, ShallowTestRender, TestRender} from '../../../../__tests__/support/testApi';
import * as React from 'react';
import {Main} from '../Main';
import {Signup} from '../../../user';

jest.mock(
  '../../../user/Signup',
  () => (props: any) => {
    props.onSceneEnd();
    props.onAnimationEnd();
    return <div>hello</div>;
  }
);

describe('the main section', () => {
  const onSceneEnd = jest.fn();

  describe('when there is a user', () => {
    describe('when signup has ended', () => {
      let subject: TestRender;

      beforeEach(async () => {
        jest.resetAllMocks();
        subject = await render(<Main {...{hasCurrentUser: true, onSceneEnd}}/>);
      });

      it('should not have a way to sign up a user', async () => {
        expect(subject.contains('hello')).not.toBeTruthy();
      });

      it('should inform that this components scene has ended', async () => {
        expect(onSceneEnd).toHaveBeenCalledTimes(1);
      });
    });

    describe('when signup has not ended', () => {
      let subject: ShallowTestRender;

      beforeEach(async () => {
        jest.resetAllMocks();
        subject = await shallowRender(<Main {...{hasCurrentUser: true, onSceneEnd}}/>);
      });

      it('should have a way to sign up a user', () => {
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });

      it('should not inform that this components scene has ended', () => {
        expect(onSceneEnd).not.toHaveBeenCalled();
      });
    });
  });

  describe('when there is no user', () => {
    describe('when signup ends', () => {
      let subject: ShallowTestRender;

      beforeEach(async () => {
        subject = await shallowRender(<Main {...{hasCurrentUser: false, onSceneEnd}}/>);
        await subject.onSceneEnd();
      });

      it('should have a way to sign up a user ', () => {
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });

      it('should not inform that this components scene has ended', () => {
        expect(onSceneEnd).not.toHaveBeenCalled();
      });
    });

    describe('when signup has not ended', () => {
      let subject: ShallowTestRender;

      beforeEach(async () => {
        subject = await shallowRender(<Main {...{hasCurrentUser: true, onSceneEnd}}/>);
      });

      it('should have a way to sign up a user', () => {
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });

      it('should not inform that this components scene has ended', () => {
        expect(onSceneEnd).not.toHaveBeenCalled();
      });
    });
  });
});
