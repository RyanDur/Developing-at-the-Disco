import {DispatchProps, State} from '../../../types';
import {ComponentProps} from 'react';

export type TestElementProps = State & DispatchProps & ComponentProps<any>;
