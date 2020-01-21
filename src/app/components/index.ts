import {userMiddleware, userReducers} from './user';
import {App} from './App';

const reducers = userReducers;

const middleware = [
  ...userMiddleware
];

export {
  middleware,
  reducers
};

export enum Path {
  HOME = '/',
  AUTH = '/authorization'
}

export default App;
