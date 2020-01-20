import React, {ReactElement} from 'react';
import {useDispatch, useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';
import {logout} from '../../../store/user/action';

export const Logout = (): ReactElement => {
  const user = useSelector(currentUser);
  const dispatch = useDispatch();

  return <button id='logout' onClick={() => dispatch(logout(user.id))}>Logout</button>;
};
