import * as React from 'react';
import {ReactElement, ReactNode} from 'react';
import ReactDOM from 'react-dom';
import {act, Simulate} from 'react-dom/test-utils';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import {has} from '../../components/util/helpers';

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
  get: (node: JSX.Element) => ReactNode;
  change: (element: HTMLInputElement, eventData: Object) => void;
  focus: (element: HTMLInputElement, eventData?: Object) => void;
  blur: (element: HTMLInputElement, eventData?: Object) => void;
  submit: (form: HTMLFormElement, eventData?: Object) => void;
  click: (form: HTMLElement) => void;
}

export interface ShallowTestRender {
  contains: (node: JSX.Element) => ReactNode;
}

export const render = (Component: ReactElement): TestRender => {
  act(() => {
    ReactDOM.render(Component, container);
  });
  return {
    container,
    getBy: <T extends HTMLElement>(selector: string) =>
      container.querySelector(`${selector}`) as T,
    get: (node) => container.querySelector(`${node.key}`),
    focus: (element: HTMLElement, event: Object) =>
      Simulate.focus(element, event as any),
    blur: (element: HTMLElement, event: Object) =>
      Simulate.blur(element, event as any),
    change: (element: HTMLElement, event: Object) =>
      Simulate.change(element, event as any),
    submit: (form: HTMLFormElement, event: Object) =>
      Simulate.submit(form, event as any),
    click: (element: HTMLElement) =>
      Simulate.click(element)
  };
};

export const shallowRender = (Component: ReactElement): ShallowTestRender => {
  const shallow = ShallowRenderer.createRenderer();
  act(() => {
    shallow.render(Component, container);
  });
  const element = shallow.getRenderOutput();
  const children = element.props.children;
  return {
    contains: (node: JSX.Element) => has(children) && (children.type === node.type || has(children.filter((child: JSX.Element) => child)) &&
      has(children.filter((elem: JSX.Element) => elem.type === node.type)))
  };
};
