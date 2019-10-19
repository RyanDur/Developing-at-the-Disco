import {connect} from '../../../store';
import {Signup} from './Signup';
import {Dispatch} from '../../../store/types';
import {create} from '../store/actions';
import reducer from './reducer';
import {UserAction} from '../index';
import {UserComponentState} from '../store/types/state';
import {selectUsernameErrors} from './selectors';

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  createUser: (name: string) => dispatch(create(name))
});

const mapStateToProps = ({signup}: UserComponentState) => ({
  userNameErrors: selectUsernameErrors(signup)
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
export {reducer};
