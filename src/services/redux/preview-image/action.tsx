export enum ActionType {
  PREVIEW_IMAGE = 'PREVIEW_IMAGE',
}

interface AuthAction {
  type: ActionType.PREVIEW_IMAGE,
  payload: {
    image: '',
    reset: false,
  };
}

export type Action = AuthAction;
