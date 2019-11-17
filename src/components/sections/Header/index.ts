import {Header} from './Header';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';
import {has} from '../../util/helpers';

export default connect(({users, userScenes}: ConnectedState) => ({
  hasCurrentUser: has(users.current) && userScenes.signupDone
}))(Header);
