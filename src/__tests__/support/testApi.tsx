import * as React from 'react';
import {ReactElement} from 'react';
import ReactDOM from 'react-dom';
import {act, Simulate} from 'react-dom/test-utils';

let container: HTMLElement = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

export interface TestRender {
  container: HTMLElement;
  getBy: <T extends HTMLElement>(selector: string) => T;
  change: (element: HTMLInputElement, eventData: Object) => void;
  focus: (element: HTMLInputElement, eventData?: Object) => void;
  blur: (element: HTMLInputElement, eventData?: Object) => void;
  submit: (form: HTMLFormElement) => void;
  click: (form: HTMLElement) => void;
}

export const render = (Component: ReactElement): TestRender => {
  act(() => {
    ReactDOM.render(Component, container);
  });
  return {
    container,
    getBy: <T extends HTMLElement>(selector: string) => container.querySelector(`${selector}`) as T,
    focus: (element: HTMLElement, event: Object) =>
      Simulate.focus(element, event as any),
    blur: (element: HTMLElement, event: Object) =>
      Simulate.blur(element, event as any),
    change: (element: HTMLElement, event: Object) =>
      Simulate.change(element, event as any),
    submit: (form: HTMLFormElement) => Simulate.submit(form),
    click: (element: HTMLElement) => Simulate.click(element)
  };
};
