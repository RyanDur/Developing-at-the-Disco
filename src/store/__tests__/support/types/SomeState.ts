import {State} from '../../../redux/types';

export interface SomeState extends State {
  value?: string;
}
