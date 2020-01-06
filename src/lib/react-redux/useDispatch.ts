import {Dispatch} from '../redux/types';
import {useContext} from 'react';
import {Context} from './Provider';

export const useDispatch = (): Dispatch => {
  const {dispatch} = useContext(Context);
  return dispatch;
};
