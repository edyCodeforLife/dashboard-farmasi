export enum ActionType {
  AUTH_ACTION = 'AUTH_ACTION',
}

interface AuthAction {
  type: ActionType.AUTH_ACTION,
  payload: {
    email: '',
    password: '',
    role: '',
    reset: false,
  };
}

export type Action = AuthAction;
