import { Action, ActionType } from './action';

const initialState = {
  image: '',
  reset: false,
};

interface State {
  image: string;
  reset: boolean;
}

const PreviewImage = (state: State = initialState, action: Action) => {
  if (action.type === ActionType.PREVIEW_IMAGE) {
    if (action.payload.reset) return initialState;

    return {
      ...state,
      image: action.payload.image,
    };
  }

  return state;
};

export default PreviewImage;
