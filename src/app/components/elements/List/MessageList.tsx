import * as React from 'react';

interface ListProps {
  messages: string[];
  className: string;
}

export const MessageList = ({messages, className}: ListProps) =>
  <ul className={className}>{messages.map((message: string) =>
    <li key={message}>{message}</li>)}
  </ul>;
