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
  transition: (element: HTMLElement) => void;
  animate: (by: HTMLElement) => void;
  contains: (element: string) => boolean;
}

export interface ShallowTestRender {
  container: HTMLElement;
  contains: (node: JSX.Element) => ReactNode;
  onSceneEnd: () => void;
  onAnimationEnd: () => void;
}

export const render = (Component: ReactElement): TestRender => {
  act(() => {
    ReactDOM.render(Component, container);
  });
  return {
    container,
    getBy: (selector: string) => container.querySelector(`${selector}`),
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
      Simulate.click(element),
    transition: (element: HTMLElement) =>
      Simulate.transitionEnd(element),
    animate: (element: HTMLElement) =>
      Simulate.animationEnd(element),
    contains: (node: string) => container.innerHTML.includes(node)
  };
};

export const shallowRender = (Component: ReactElement): ShallowTestRender => {
  const shallow = ShallowRenderer.createRenderer();
  act(() => {
    shallow.render(Component, container);
  });
  let rendered = shallow.getRenderOutput();
  let children = rendered.props.children;
  return {
    container,
    onSceneEnd: () => {
      if (has(children)) {
        children.props.onSceneEnd();
        rendered = shallow.getRenderOutput();
        children = rendered.props.children;
      }
    },
    onAnimationEnd: () => {
      if (has(children)) {
        children.props.onAnimationEnd();
        rendered = shallow.getRenderOutput();
        children = rendered.props.children;
      }
    },
    contains: (node: JSX.Element) =>
      has(children) && (children.type === node.type ||
      has(children.filter((child: JSX.Element) => child)) &&
      has(children.filter((elem: JSX.Element) => elem.type === node.type)))
  };
};
