import * as React from 'react';
import {OtherUsersPage} from '../store/data/types';

interface OthersProps {
  others: OtherUsersPage;
}

export const Others = ({others}: OthersProps) => {
  return <ul className='other-users'>
    {others.content.map(user =>
      <li key={user.id}>{user.name}</li>)}
  </ul>;
};
