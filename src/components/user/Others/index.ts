import {connect} from '../../../store';
import {Others} from './Others';
import {UserComponentState} from '../store/types/state';

export default connect(({users}: UserComponentState) => ({
  others: users.others
}))(Others);
