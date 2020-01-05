import {useContext, useEffect, useState} from 'react';
import {Context} from './Provider';
import {AnyState} from '../redux/types';

type Selector = (state: AnyState) => any;

export const useSelector = (selector: Selector): any => {
  const {getState, subscribe} = useContext(Context);
  const [state, setState] = useState(getState());

  useEffect(() => subscribe(() => {
    const newState = getState();
    if (state !== newState) {
      setState(newState);
    }
  }));

  return selector(state);
};
