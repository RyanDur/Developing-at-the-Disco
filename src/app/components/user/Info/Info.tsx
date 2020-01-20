import * as React from 'react';
import './Info.css';
import {useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';

export const Info = () => {
  const {name} = useSelector(currentUser) || {};
  return <figure id='current-user-info'>
    <img className='avatar enter'
         src={require(__dirname + '/assets/images/duck.svg')}
         alt={`${name}'s avatar`}
         title='duck'/>
    <figcaption className='name fade-in'>
      {name}
    </figcaption>
  </figure>;
};
