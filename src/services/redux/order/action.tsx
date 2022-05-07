export enum ActionType {
  SEARCH_KEYWORD = 'SEARCH_KEYWORD',
}

interface AuthAction {
  type: ActionType.SEARCH_KEYWORD,
  payload: {
    keyword: '',
    reset: false,
  };
}

export type Action = AuthAction;
