import { Dispatch } from 'redux';
import { Action, ActionType } from './action';

const searchKeyword = (payload) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.SEARCH_KEYWORD,
    payload,
  });
};

export default searchKeyword;
