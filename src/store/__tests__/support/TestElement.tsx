import * as React from 'react';
import {UnconnectedProps} from './types/UnconnectedProps';
import {TestElementProps} from './types/TestElementProps';

export const TestElement = ({value, func, children, other}: TestElementProps & UnconnectedProps) =>
  <section>
    <div id='value'>{value}</div>
    <div id='other'>{other}</div>
    <button onClick={func}/>
    {children}
  </section>;
