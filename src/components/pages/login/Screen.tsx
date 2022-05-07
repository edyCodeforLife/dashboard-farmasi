import React from 'react';
import LoginForm from '@organisms/authentication/LoginForm';
import Authentication from '@templates/authentication/Authentication';

import Service from './Service';

const Login = () => {
  const {
    role,
    modal,
    email,
    submit,
    disabled,
    password,
    modalClose,
    setUpCredential,
    isShowPassword,
    setIsShowPassword,
  } = Service();

  return (
    <Authentication>
      <LoginForm
        modal={modal}
        email={email}
        submit={submit}
        role={role}
        password={password}
        disabled={disabled}
        modalClose={() => modalClose()}
        isShowPassword={isShowPassword}
        setUpCredential={(event: any, from: string) => setUpCredential(event, from)}
        setIsShowPassword={(value: boolean) => setIsShowPassword(value)}
      />
    </Authentication>
  );
};

export default Login;
