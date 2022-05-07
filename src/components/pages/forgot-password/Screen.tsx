import React from 'react';
import ForgotPasswordForm from '@organisms/authentication/ForgotPasswordForm';
import Authentication from '@templates/authentication/Authentication';
import Service from './Service';

const ForgotPassword = () => {
  const {
    modal,
    email,
    submit,
    disabled,
    modalClose,
    setUpCredential,
  } = Service();

  return (
    <Authentication>
      <ForgotPasswordForm
        modal={modal}
        email={email}
        submit={submit}
        disabled={disabled}
        modalClose={modalClose}
        setUpCredential={(event: any, from: string) => setUpCredential(event, from)}
      />
    </Authentication>
  );
};

export default ForgotPassword;
