import * as React from 'react';
import {OtherUsers} from '../store/types/user';

interface OthersProps {
  others: OtherUsers;
}

export const Others = ({others}: OthersProps) => {
  return <ul className='other-users'>
    {others.map(user => {
      return <li key={user.id}>{user.name}</li>;
    })}
  </ul>;
};
