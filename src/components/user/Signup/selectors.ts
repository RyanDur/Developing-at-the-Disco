import {UserComponentState} from '../store/types/state';

export const selectUsernameErrors = ({signup}: UserComponentState): any =>
  signup.username;
