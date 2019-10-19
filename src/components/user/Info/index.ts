import {connect} from '../../../store';
import {Info} from './Info';
import {InfoProps} from './types';
import {UserComponentState} from '../store/types';

export default connect<InfoProps>(({users}: UserComponentState) => ({
  name: users.current.name
}))(Info);
