import {Logout} from '../Logout';
import {render, useDispatchSpy, useSelectorSpy} from '../../../../__tests__/support/testApi';
import React from 'react';
import {logout} from '../../../../store/user/action';
import {CurrentUser, UserStatus} from '../../../../store/user/types/user';

describe('Logout', () => {
  it('should logout a user', async () => {
    const mockDispatch = jest.fn();
    const currentUser: CurrentUser = {id: 'some-id', name: 'face', status: UserStatus.AVAILABLE};
    useSelectorSpy(jest.fn(() => currentUser));
    useDispatchSpy(mockDispatch);

    const {click, getBy} = await render(<Logout/>);

    click(getBy('#logout'));

    expect(mockDispatch).toHaveBeenCalledWith(logout(currentUser.id));
  });
});
