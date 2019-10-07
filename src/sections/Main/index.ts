import {Main} from './Main';
import {connect} from '../../store';
import {ConnectedState} from '../../components';

export default connect(({user}: ConnectedState) => ({
  noCurrentUser: !user.current
}))(Main);
