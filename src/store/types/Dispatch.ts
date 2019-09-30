import {Action, AnyAction} from './Action';
import * as React from 'react';

export type Dispatch<A extends Action = AnyAction> = React.Dispatch<A>;
