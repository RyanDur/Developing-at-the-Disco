import * as React from 'react';

interface ListProps {
  items: string[];
  className: string;
}

export const List = ({items, className}: ListProps) =>
  <ul className={className}>{items.map((message: string) =>
    <li key={message}>{message}</li>)}
  </ul>;
