import * as React from 'react';
import {DetailedHTMLProps, HTMLAttributes} from 'react';

interface ListProps {
  messages: string[];
  className: string;
}

export const MessageList = ({messages, ...props}: ListProps & DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) =>
  <ul {...props}>{messages.map((message: string) =>
    <li key={message}>{message}</li>)}
  </ul>;
