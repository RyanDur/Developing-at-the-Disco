import {connect} from '../../../store';
import {Info} from './Info';
import {InfoProps} from './types';
import {UserComponentState} from '../store/types';

export default connect<InfoProps>(({user}: UserComponentState) => ({
  name: user.current.name
}))(Info);
