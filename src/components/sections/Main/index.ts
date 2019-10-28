import {Main} from './Main';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';
import {empty, has} from '../../util/helpers';

export default connect(({users}: ConnectedState) => ({
  noCurrentUser: empty(users.current),
  otherUsers: has(users.others)
}))(Main);
