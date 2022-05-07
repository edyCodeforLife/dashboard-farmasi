import { combineReducers } from 'redux';
import AuthReducer from './authentication/reducer';
import SearchKeywordReducer from './order/reducer';
import PreviewImage from './preview-image/reducer';

const reducers = combineReducers({
  auth: AuthReducer,
  searchByKeyword: SearchKeywordReducer,
  previewImage: PreviewImage,
});

export default reducers;

export type State = ReturnType<typeof reducers>;
