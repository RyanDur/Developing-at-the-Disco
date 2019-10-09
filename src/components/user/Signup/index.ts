import {connect} from '../../../store';
import {Signup} from './Signup';
import {Dispatch} from '../../../store/types';
import {create} from '../store/actions';
import {UserAction} from '../store/types';

const mapDispatchToProps = (dispatch: Dispatch<UserAction>) => ({
  createUser: (name: string) => dispatch(create(name))
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
