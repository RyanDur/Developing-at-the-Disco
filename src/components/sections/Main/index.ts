import {Main} from './Main';
import {connect} from '../../../store';
import {ConnectedState} from '../../index';

export default connect(({users}: ConnectedState) => ({
  noCurrentUser: !users.current
}))(Main);
