import { Dispatch } from 'redux';
import { Action, ActionType } from './action';

const AuthCreator = (payload) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.AUTH_ACTION,
    payload,
  });
};

export default AuthCreator;
