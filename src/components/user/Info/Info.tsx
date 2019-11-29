import * as React from 'react';
import {InfoProps} from './types';
import './Info.css';

export const Info = ({name}: InfoProps) =>
  <figure id='current-user-info'>
    <img className='avatar enter'
         src={require(__dirname + '/assets/images/duck.svg')}
         alt={`${name}'s avatar`}
         title='duck'/>
    <figcaption className='name fade-in'>
      {name}
    </figcaption>
  </figure>;
