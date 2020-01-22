import * as React from 'react';
import * as MyReactRedux from '../../lib/react-redux';

export const useSelectorSpy = (mockSelector: jest.Mock) => jest.spyOn(MyReactRedux, 'useSelector')
  .mockImplementation(mockSelector);

export const useDispatchSpy = (mockDispatch: jest.Mock) => jest.spyOn(MyReactRedux, 'useDispatch')
  .mockImplementation(() => mockDispatch);
