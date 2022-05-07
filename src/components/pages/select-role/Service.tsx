import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import AuthCreator from '@services/redux/authentication/action-creator';
import { ActionType } from '@services/redux/authentication/action';
import { SetStorage } from '@helpers/local-storage';
import { State } from '@services/redux/reducer';

const Service = () => {
  const dispatch = useDispatch();
  const Executor = bindActionCreators(AuthCreator, dispatch);
  const auth = useSelector((state: State) => state.auth);

  const selectRole = (role: string) => {
    SetStorage('role', role);
    Executor({
      email: '',
      password: '',
      reset: false,
      role,
    });
  };

  return {
    selectRole,
  };
};

export default Service;
