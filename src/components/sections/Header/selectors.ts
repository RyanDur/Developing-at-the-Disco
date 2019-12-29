import {has} from '../../util/helpers';
import {UserComponentState} from '../../user/store/types/state';

export const checkForCurrentUser = ({
  users,
  userScenes
}: UserComponentState) => has(users.current) && userScenes.signupDone;
