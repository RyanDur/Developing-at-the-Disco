import {Authorization} from './Authorization';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';
import {has} from '../../util/helpers';
import {Dispatch} from '../../../store/types';
import {UserAction} from '../../user';
import {signupDone} from '../../user/scenes';

export default connect(
  ({users}: ConnectedState) => ({
    hasCurrentUser: has(users.current)
  }),
  (dispatch: Dispatch<UserAction>) => ({
    signupEnded: (isEnded: boolean) => dispatch(signupDone(isEnded))
  })
)(Authorization);
