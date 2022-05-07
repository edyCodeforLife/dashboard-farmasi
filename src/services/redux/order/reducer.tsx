import { Action, ActionType } from './action';

const initialState = {
  keyword: '',
  reset: false,
};

interface State {
  keyword: string;
  reset: boolean;
}

const SearchKeywordReducer = (state: State = initialState, action: Action) => {
  if (action.type === ActionType.SEARCH_KEYWORD) {
    if (action.payload.reset) return initialState;

    return {
      ...state,
      keyword: action.payload.keyword,
    };
  }

  return state;
};

export default SearchKeywordReducer;
