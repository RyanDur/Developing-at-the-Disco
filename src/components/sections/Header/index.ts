import {Header} from './Header';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';

export default connect(({users}: ConnectedState) => ({
  hasCurrentUser: !!users.current
}))(Header);
