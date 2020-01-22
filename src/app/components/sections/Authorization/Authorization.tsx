import * as React from 'react';
import {useEffect} from 'react';
import {Signup} from '../../user';
import {has} from '../../../../lib/util/helpers';
import {useSelector} from '../../../../lib/react-redux';
import {currentUser} from '../../../store/user/selector';
import {useHistory} from 'react-router-dom';
import {Path} from '../../index';
import './Authorization.css';

export const Authorization = () => {
  const user = useSelector(currentUser);
  const history = useHistory();

  useEffect(() => {
    if (has(user)) history.push(Path.HOME);
  });

  return <main id='content'>
    <Signup className='authorization'/>
  </main>;
};
