import {ComponentProps} from 'react';
import {State} from '../../../redux/types';

export interface TestDispatchProps {
  someFunction: () => void;
}

export type TestElementProps = State & TestDispatchProps & ComponentProps<any>;
