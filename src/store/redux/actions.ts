import {Action} from './types';

export enum StartUp {
  init = '@@__init__@@'
}

interface StartUpAction extends Action<StartUp.init> {}

export const start = (): StartUpAction => ({type: StartUp.init});
