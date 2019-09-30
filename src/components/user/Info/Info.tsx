import * as React from 'react';
import {InfoProps} from './types';

export const Info = ({name}: InfoProps) => {
  return <article id='current-user'>
    <div className='name'>
      {name}
    </div>
  </article>;
};
