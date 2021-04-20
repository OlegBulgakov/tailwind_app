import { createStore } from 'redux';
import rootReducer from './reducers/index';

export default function(initialState = {}) {
  return createStore(rootReducer, initialState);
}
