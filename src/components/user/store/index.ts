import {createUser} from './data';
import {createUserMiddleware} from './middleware';
import reducer from './reducer';

const userMiddleware = [createUserMiddleware(createUser)];
const userReducer = reducer;

export {userMiddleware, userReducer};
