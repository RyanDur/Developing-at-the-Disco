import * as React from 'react';
import {ComponentProps} from 'react';
import {useDispatch, useSelector} from '../../react-redux';
import {AnyAction} from '../../redux/types';

interface TestProps {
  testActions: AnyAction[];
}

export const TestElement = ({testActions = [], children}: ComponentProps<any> & TestProps) => {
  const {value, other} = useSelector(state => state);
  const dispatch = useDispatch();
  return <section>
    <div id='value'>{value}</div>
    <div id='other'>{other}</div>
    <button onClick={() => {
      testActions.forEach(dispatch);
    }}/>
    {children}
  </section>;
};
