import * as React from 'react';
import {useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';
import './Info.css';

export const Info = () => {
  const {name} = useSelector(currentUser) || {};
  return <figure id='current-user-info'>
    <img className='avatar'
         src={require(__dirname + '/assets/images/duck.svg')}
         alt={`${name}'s avatar`}
         title='duck'/>
    <figcaption className='name'>
      {name}
    </figcaption>
  </figure>;
};
