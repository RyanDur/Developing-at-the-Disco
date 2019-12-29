import {ConnectedState} from '../../index';
import {has} from '../../util/helpers';

export const checkForCurrentUser = ({users}: ConnectedState) => has(users.current);
