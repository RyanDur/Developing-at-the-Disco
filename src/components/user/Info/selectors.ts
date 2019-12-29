import {UserComponentState} from '../store/types';

export const currentUserName = ({users}: UserComponentState) =>
  users.current.name;
