import {not} from './util/helpers';
import {ConnectedState} from './index';

export const checkAuthorization = ({users, userScenes}: ConnectedState) =>
  not(users.current || userScenes.signupDone);
