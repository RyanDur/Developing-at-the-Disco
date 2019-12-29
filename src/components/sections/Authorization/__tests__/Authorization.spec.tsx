import {
  render,
  shallowRender,
  ShallowTestRender,
  TestRender,
  useDispatchSpy,
  useSelectorSpy
} from '../../../../__tests__/support/testApi';
import * as React from 'react';
import {Authorization} from '../Authorization';
import {Signup} from '../../../user';

jest.mock(
  '../../../user/Signup',
  () => (props: any) => {
    props.onSceneEnd();
    props.onAnimationEnd();
    return <div>hello</div>;
  }
);

describe('the authorization section', () => {
  const mockSelector = jest.fn();
  const mockDispatch = jest.fn();
  useDispatchSpy(mockDispatch);
  useSelectorSpy(mockSelector);

  describe('when there is a user', () => {
    describe('when signup has ended', () => {
      let subject: TestRender;

      beforeEach(async () => {
        mockSelector.mockImplementation(() => true);
        subject = await render(<Authorization/>);
      });

      it('should inform that this components scene has ended', async () => {
        expect(mockDispatch).toHaveBeenCalledTimes(1);
      });
    });

    describe('when signup has not ended', () => {
      let subject: ShallowTestRender;

      beforeEach(async () => {
        jest.resetAllMocks();
        mockSelector.mockImplementation(() => true);
        subject = await shallowRender(<Authorization/>);
      });

      it('should have a way to sign up a user', () => {
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });

      it('should not inform that this components scene has ended', () => {
        expect(mockDispatch).not.toHaveBeenCalled();
      });
    });
  });

  describe('when there is no user', () => {
    describe('when signup ends', () => {
      let subject: ShallowTestRender;

      beforeEach(async () => {
        mockSelector.mockImplementation(() => false);
        subject = await shallowRender(<Authorization/>);
        await subject.onSceneEnd();
      });

      it('should have a way to sign up a user ', () => {
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });

      it('should not inform that this components scene has ended', () => {
        expect(mockDispatch).not.toHaveBeenCalled();
      });
    });

    describe('when signup has not ended', () => {
      let subject: ShallowTestRender;

      beforeEach(async () => {
        mockSelector.mockImplementation(() => true);
        subject = await shallowRender(<Authorization/>);
      });

      it('should have a way to sign up a user', () => {
        expect(subject.contains(<Signup/>)).toBeTruthy();
      });

      it('should not inform that this components scene has ended', () => {
        expect(mockDispatch).not.toHaveBeenCalled();
      });
    });
  });
});
