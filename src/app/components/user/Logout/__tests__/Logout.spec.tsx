import {Logout} from '../Logout';
import {useDispatchSpy, useSelectorSpy} from '../../../../../__tests__/support/testApi';
import React from 'react';
import {logout} from '../../../../store/user/action';
import {CurrentUser, UserStatus} from '../../../../store/user/types/user';
import {mount} from 'enzyme';

describe('Logout', () => {
  it('should logout a user', () => {
    const mockDispatch = jest.fn();
    const currentUser: CurrentUser = {id: 'some-id', name: 'face', status: UserStatus.AVAILABLE};
    useSelectorSpy(jest.fn(() => currentUser));
    useDispatchSpy(mockDispatch);

    const subject = mount(<Logout/>);

    subject.find('#logout').simulate('click')

    expect(mockDispatch).toHaveBeenCalledWith(logout(currentUser.id));
  });
});
