import {create} from './data';
import {createUserMiddleware} from './middleware';
import reducer from './reducer';

const userMiddleware = [createUserMiddleware(create)];
const userReducer = reducer;

export {userMiddleware, userReducer};
