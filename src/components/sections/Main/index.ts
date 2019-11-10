import {Main} from './Main';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';
import {has} from '../../util/helpers';

export default connect(({users}: ConnectedState) => ({
  hasCurrentUser: has(users.current)
}))(Main);
