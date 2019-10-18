import {Action} from './types';

export enum StartUp {
  init = '@@__init__@@'
}

interface StartUpAction extends Action<StartUp.init> {}

export type InitAction = StartUpAction;

export const start = (): StartUpAction => ({type: StartUp.init});
