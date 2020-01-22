import {useSelectorSpy} from '../../../../../__tests__/support/testApi';
import * as React from 'react';
import {Authorization} from '../Authorization';
import {ShallowWrapper, shallow} from 'enzyme';
import {Signup} from '../../../user';

describe('the authorization section', () => {
  const mockSelector = jest.fn();
  useSelectorSpy(mockSelector);

  describe('when authorized', () => {
    let subject: ShallowWrapper;

    beforeEach(() => {
      mockSelector.mockImplementation(() => true);
      subject = shallow(<Authorization/>);
    });

    it('should remove signup', () => {
      expect(subject.find(Signup).hasClass('remove')).toBe(true);
    });
  });
});
