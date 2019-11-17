import * as React from 'react';
import {InfoProps} from './types';
import './Info.css';

export const Info = ({name}: InfoProps) => {
  return <figure id='current-user'>
    <img className='avatar'
         src={require(__dirname + '/assets/images/duck.svg')}
         alt='current user avatar'
         title='duck'/>
    <figcaption className='name'>
      {name}
    </figcaption>
  </figure>;
};
