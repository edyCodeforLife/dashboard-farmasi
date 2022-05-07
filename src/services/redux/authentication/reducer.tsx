import { Action, ActionType } from './action';

const initialState = {
  email: '',
  password: '',
  role: '',
  reset: false,
};

interface State {
  email: string;
  password: string;
  role: string;
  reset: boolean;
}

const AuthReducer = (state: State = initialState, action: Action) => {
  if (action.type === ActionType.AUTH_ACTION) {
    if (action.payload.reset) return initialState;

    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
      role: action.payload.role,
    };
  }

  return state;
};

export default AuthReducer;
