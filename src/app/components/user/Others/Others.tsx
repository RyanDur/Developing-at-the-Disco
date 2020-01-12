import * as React from 'react';
import {OtherUsersPage} from '../../../data/types';
import {OtherUser} from '../../../store/user/types';

interface OthersProps {
  others: OtherUsersPage;
}

export const Others = ({others}: OthersProps) => {
  return <ul className='other-users'>
    {others.content.map((user: OtherUser) =>
      <li key={user.id}>{user.name}</li>)}
  </ul>;
};
