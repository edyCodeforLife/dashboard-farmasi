import { Dispatch } from 'redux';
import { Action, ActionType } from './action';

const previewImage = (payload) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.PREVIEW_IMAGE,
    payload,
  });
};

export default previewImage;
