import {Header} from './Header';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';

export default connect(({user}: ConnectedState) => ({
  hasCurrentUser: !!user.current
}))(Header);
